export * from './configurator';
export * from './fetcher';
export * from './type';

import { ConfiguratorFactory, FetcherConfig } from '.';

export const generateFetcherConfig = (argObj: any) => {
  const config = defaultFetcherConfig();
  Object.entries(argObj).forEach(entry => ConfiguratorFactory(entry).configure(config));

  return config;
};

const defaultFetcherConfig = () => {
  return {
    urlConfig: { path: '', protocol: 'http' },
    reqConfig: {},
  } as FetcherConfig;
};
