import ProxyAgent from 'proxy-agent';
import ObsClient from 'esdk-obs-nodejs';
import { ITinyProConfig } from '../../core/config';

export const createObsClient = (cliConfig: ITinyProConfig) => {
  const proxy = process.env.HTTP_PROXY || process.env.HTTPS_PROXY;
  const server = `http://obs.${cliConfig.region.id}.myhuaweicloud.com`;
  const clientOptions = {
    access_key_id: cliConfig.accessKeyId,
    secret_access_key: cliConfig.secretAccessKey,
    server,
  };
  let options = { ...clientOptions };

  if (proxy) {
    const proxyOptions = {
      http_agent: new ProxyAgent(proxy),
      https_agent: new ProxyAgent(proxy),
    };
    options = { ...clientOptions, ...proxyOptions };
  }
  const obsClient = new ObsClient(options);

  return obsClient;
};
