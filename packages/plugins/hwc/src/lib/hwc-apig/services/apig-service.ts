import hcloudClient from '../../../core/hcloud-client';

// 创建API网关
export const createApig = async (instanceId: string, cliConfig, ans) => {
  let cmd = `hcloud apig CreateApiV2
    --cli-region="${cliConfig.region.id}"
    --project_id="${cliConfig.projectId}"

    --instance_id="${instanceId}"
    --name="${ans.name}"
    --group_id="${ans.group_id}"
    --type="${ans.type}"

    --req_protocol="${ans.req_protocol}"
    --req_uri="${ans.req_uri}"
    --match_mode="${ans.match_mode}"
    --req_method="${ans.req_method}"
    --cors=${ans.cors}
    --auth_type="${ans.auth_type}"

    --backend_type="${ans.backend_type}"
    --func_info.function_urn="${ans.func_info.function_urn}"
    --func_info.invocation_type="${ans.func_info.invocation_type}"
    --func_info.timeout="${ans.func_info.timeout}"
    --func_info.version="${ans.func_info.version}"
    `;

  // 补充请求参数与后台参数
  if (ans.req_params) {
    ans.req_params.forEach((param, idx) => {
      cmd += ` --req_params.${idx + 1}.name="${param.name}" \n`;
      cmd += ` --req_params.${idx + 1}.type="${param.type}" \n`;
      cmd += ` --req_params.${idx + 1}.location="${param.location}" \n`;
    });
    ans.backend_params.forEach((param, idx) => {
      cmd += ` --backend_params.${idx + 1}.name="${param.name}" \n`;
      cmd += ` --backend_params.${idx + 1}.origin="${param.origin}" \n`;
      cmd += ` --backend_params.${idx + 1}.location="${param.location}" \n`;
      cmd += ` --backend_params.${idx + 1}.value="${param.value}" \n`;
    });
  }

  return hcloudClient.execJson(cmd);
};

// 为分组创建一个默认的options apig
export const createCorsApig = async (
  instanceId: string,
  cliConfig,
  groupId: string
) => {
  const cmd = `hcloud apig CreateApiV2
    --cli-region="${cliConfig.region.id}"
    --project_id="${cliConfig.projectId}"

    --instance_id="${instanceId}"
    --name="group_cors_gate"
    --group_id="${groupId}"
    --type="1"

    --req_protocol="BOTH"
    --req_uri="/"
    --match_mode="SWA"
    --req_method="OPTIONS"
    --cors=true
    --auth_type="NONE"

    --backend_type="MOCK"
    --mock_info.result_content=""
    `;

  return hcloudClient.execJson(cmd);
};

export const getApigList = async (instanceId: string, regionId: string) => {
  const res = await hcloudClient.execJson(
    `hcloud APIG ListApisV2
      --instance_id="${instanceId}"
      --cli-region="${regionId}"
      --limit=500`
  );

  return res.apis;
};

export const publishRecordForApi = async (
  instanceId: string,
  regionId: string,
  apiId: string
) => {
  const res = await hcloudClient.execJson(
    `hcloud APIG CreateOrDeletePublishRecordForApiV2 --instance_id="${instanceId}"
      --cli-region="${regionId}" --action="online" --api_id="${apiId}"
      --env_id="DEFAULT_ENVIRONMENT_RELEASE_ID"`
  );

  return res;
};
