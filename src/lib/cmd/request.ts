import { Fetcher, generateFetcherConfig } from '../fetcher';

export const makeRequest = async (argObj: any) => {
  try {
    const config = generateFetcherConfig(argObj);
    const fetcher = new Fetcher(config);
    return fetcher.execute();
  } catch (error) {
    throw error;
  }
};
