import fetch from 'node-fetch';
import { FetcherConfig } from '.';

export class Fetcher {
  constructor(private config: FetcherConfig) {}

  async execute() {
    const url = this.getUrl();
    const reqConfig = this.config.reqConfig;
    return fetch(url, reqConfig);
  }

  private getUrl() {
    const { urlConfig } = this.config;
    this.throwIfUrlIsInvalid();
    return urlConfig.protocol + '://' + urlConfig.path;
  }

  private throwIfUrlIsInvalid() {
    const { urlConfig } = this.config;
    if (!(urlConfig.protocol.length && urlConfig.path.length)) throw Error('Invalid url');
  }
}
