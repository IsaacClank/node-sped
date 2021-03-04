import { RequestInit } from 'node-fetch';

export interface FetcherConfig {
  urlConfig: {
    protocol: string;
    path: string;
  };
  reqConfig: RequestInit;
}
