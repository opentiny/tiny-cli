import { fs } from '@opentiny/cli-devkit';
import path from 'path';
import archiver from 'archiver';
import hcloudClient from '../../../core/hcloud-client';
import {
  DependencyInfo,
  FunctionGraphCodeInfo,
  FunctionGraphInfo,
} from '../../hwc.types';
import { delay } from '../../../core';

/** 查找一个委托 */
export const queryTheAgency = async (cliConfig, domainId, name) => {
  const res = await hcloudClient.execJson(
    `hcloud iam ListAgencies
    --cli-region="${cliConfig.region.id}"
    --domain_id="${domainId}"
    --name="${name}" `
  );
  return res.agencies;
};

/** 创建一个委托 */
export const createAgency = async (cliConfig, domainId, name) => {
  const res = await hcloudClient.exec(
    `hcloud iam CreateAgency
      --cli-region="${cliConfig.region.id}"
      --agency.domain_id="${domainId}"
      --agency.name="${name}"
      --agency.duration="FOREVER"
      --agency.trust_domain_name="op_svc_cff" `
  );
  return res;
};

/** 查询现在的函数列表 */
export const queryFunctions = async (cliConfig) => {
  const res = await hcloudClient.execJson(
    `hcloud FunctionGraph ListFunctions
    --cli-region="${cliConfig.region.id}"
    --project_id="${cliConfig.projectId}"`
  );
  return res.functions as Array<FunctionGraphInfo>;
};

/** 创建一个函数 */
export const createFg = async (cliConfig, ans) => {
  const res = await hcloudClient.execJson(
    `hcloud FunctionGraph CreateFunction
      --cli-region="${cliConfig.region.id}"
      --project_id="${cliConfig.projectId}"
      --code_type="zip"
      --func_name="${ans.name}"
      --handler="index.handler"
      --memory_size="${ans.memory_size}"
      --package="default"
      --runtime="${ans.runtime}"
      --timeout="${ans.timeout}"
      --type="${ans.type}"
      --code_filename="index.zip"
      --func_code.file="UEsDBBQAAAAIAKuFD1VjNkKhpQAAANMAAAAIAAAAaW5kZXguanMtjs0KwkAMhO99itxqodYi4mGlHixePOhBX2DtpnalZMsmlRbpu9sfIZBhMvMR7BrnhZNKk6nRQwaaeypghR8kiaFwJNhJBNkRvgGAR2k9zRKARUvLuTOoYJum8WxWqA16Vv8MQJhPDJL1o28wVBDqpqltocU62rzZUbgUh2VZPmnG/e5MxQg2CkpdMy63pzO9gsv9dk1YvKWXLfvl02gKDIdgnB9QSwECHwAUAAAACACrhQ9VYzZCoaUAAADTAAAACAAkAAAAAAAAACAAAAAAAAAAaW5kZXguanMKACAAAAAAAAEAGABJRypbg7DYAUlHKluDsNgBWn+kJIOw2AFQSwUGAAAAAAEAAQBaAAAAywAAAAAA"
      --description="auto generated" `
  );
  return res;
};

/** 查询一个函数的code */
export const queryFgCode = async (cliConfig, urn) => {
  const res = await hcloudClient.execJson(
    `hcloud FunctionGraph ShowFunctionCode
      --cli-region="${cliConfig.region.id}"
      --project_id="${cliConfig.projectId}"
      --function_urn="${urn}"
    `
  );
  return res as FunctionGraphCodeInfo;
};

/** 更新一个函数的code */
export const updateFgCode = async (
  cliConfig,
  ans,
  oldFuncCode: FunctionGraphCodeInfo
) => {
  const reqBody =
    ans.dirname === ''
      ? {
          code_type: 'obs',
          code_url: oldFuncCode.func_code.link,
          depend_list: ans.depend_list,
        }
      : {
          code_type: 'zip',
          code_filename: 'index.zip',
          func_code: { file: await zipFolder(ans.dirname) },
          depend_list: ans.depend_list,
        };

  const jsonInputName = 'Fg_UpdateFunctionCode.json';
  const content = {
    path: {
      project_id: cliConfig.projectId,
      function_urn: ans.func_urn,
    },
    body: reqBody,
  };
  await fs.writeFile(jsonInputName, JSON.stringify(content));
  const res = await hcloudClient.execJson(
    `hcloud FunctionGraph UpdateFunctionCode
      --cli-jsonInput="${jsonInputName}"
      `
  );
  fs.removeSync(jsonInputName);
  return res;
};

/** 查询现在的依赖列表 */
export const queryDeps = async (cliConfig) => {
  const res = await hcloudClient.execJson(
    `hcloud FunctionGraph ListDependencies
    --cli-region="${cliConfig.region.id}"
    --project_id="${cliConfig.projectId}"
  `
  );
  // 过滤并排序依赖包
  const allDeps = res.dependencies as Array<DependencyInfo>;
  let deps = allDeps.filter((dep) => dep.runtime.includes('Node'));
  deps.forEach((dep) => (dep.isPublic = dep.owner !== cliConfig.projectId));
  deps = deps.sort((d1, d2) => (d1.runtime > d2.runtime ? 1 : -1));
  return deps;
};

/** 创建一个依赖 */
export const createDepCode = async (cliConfig, ans) => {
  const filebase64 = await zipFolder(ans.dirname);
  const jsonInputName = 'Fg_UpdateDependcy.json';
  const content = {
    path: {
      project_id: cliConfig.projectId,
    } as any,
    body: {
      name: ans.name,
      runtime: ans.runtime,
      depend_type: 'zip',
      depend_file: filebase64,
    },
  };

  await fs.writeFile(jsonInputName, JSON.stringify(content));
  await hcloudClient.execJson(
    `hcloud FunctionGraph CreateDependency
      --cli-jsonInput="${jsonInputName}"
    `
  );
  fs.removeSync(jsonInputName);
};

/** 更新一个依赖 */
export const updateDepCode = async (cliConfig, ans, oldDep) => {
  const jsonInputName = 'Fg_UpdateDependcy.json';
  const content: any = {
    path: {
      project_id: cliConfig.projectId,
      depend_id: ans.depend_id,
    } as any,
    body: {
      name: ans.name,
      runtime: ans.runtime,
      depend_type: 'zip',
    },
  };
  if (ans.dirname === '') {
    content.body.depend_link = oldDep.link;
  } else {
    content.body.depend_file = await zipFolder(ans.dirname);
  }

  await fs.writeFile(jsonInputName, JSON.stringify(content));
  await hcloudClient.execJson(
    `hcloud FunctionGraph UpdateDependcy
      --cli-jsonInput="${jsonInputName}"
    `
  );
  fs.removeSync(jsonInputName);
};

/** 把一个文件夹转base64 */
export const zipFolder = async (dir: string) => {
  const cwd = process.cwd();
  const dirPath = path.resolve(cwd, dir);
  const zipPath = path.resolve(cwd, 'index.zip');

  if (fs.existsSync(dirPath)) {
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', {
      zlib: { level: 9 },
    });

    archive.pipe(output);
    archive.directory(dirPath, false);
    await archive.finalize();

    // 读zip文件，转base64
    await delay(10);
    const data = fs.readFileSync(zipPath);
    const base64 = Buffer.from(data).toString('base64');

    fs.removeSync(zipPath);
    return base64;
  }
  return '';
};
