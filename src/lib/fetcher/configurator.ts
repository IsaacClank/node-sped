import { FetcherConfig } from '.';

export const ConfiguratorFactory = (argObjEntry: [string, any]): Configurator => {
  const key = argObjEntry[0];
  const value = argObjEntry[1];

  switch (key) {
    case '-m':
    case '--method':
      return new ReqMethodConfigurator(value);

    case '-b':
    case '--body':
      return new ReqBodyConfigurator(value);

    case '-S':
      return new SSLConfigurator();

    case '-P':
      return new PostRequestConfigurator();

    case 'url':
      return new UrlConfigurator(value);

    default:
      throw Error(`Failed to process '${value}'`);
  }
};

export interface Configurator {
  configure(config: FetcherConfig): void;
}

/* ----------------------------------------------------------------------------------------- */
/* CONFIGURATORS IMPLEMENTATIONS                                                             */
/* ----------------------------------------------------------------------------------------- */

class ReqMethodConfigurator implements Configurator {
  constructor(private reqMethod: string) {}

  configure(config: FetcherConfig): void {
    this.throwIfInvalidMethod();
    config.reqConfig.method = this.reqMethod;
  }

  private throwIfInvalidMethod() {
    if (!['POST', 'GET'].includes(this.reqMethod))
      throw Error(`Invalid request method '${this.reqMethod}'`);
  }
}

class ReqBodyConfigurator implements Configurator {
  constructor(private bodyData: string) {}

  configure(config: FetcherConfig) {
    this.throwIfCannotParseJsonString();
    config.reqConfig.body = this.bodyData;
    config.reqConfig.headers = {
      ...config.reqConfig.headers,
      [`Content-Type`]: 'application/json',
    };
  }

  private throwIfCannotParseJsonString() {
    if (!JSON.parse(this.bodyData)) throw Error(`Failed to parse body data into json format`);
  }
}

class UrlConfigurator implements Configurator {
  constructor(private url: string) {}

  configure(config: FetcherConfig) {
    if (this.urlIncludesProtocol()) this.splitUrlAndConfigure(config);
    else config.urlConfig.path = this.url;
  }

  private urlIncludesProtocol() {
    const protocolPattern = /^http[s]+:\/\//;
    return protocolPattern.test(this.url);
  }

  private splitUrlAndConfigure(config: FetcherConfig) {
    const [protocol, path] = this.url.split('://');
    config.urlConfig.protocol = protocol;
    config.urlConfig.path = path;
  }
}

class PostRequestConfigurator implements Configurator {
  configure(config: FetcherConfig) {
    config.reqConfig.method = 'POST';
  }
}

class SSLConfigurator implements Configurator {
  configure(config: FetcherConfig) {
    config.urlConfig.protocol = 'https';
  }
}
