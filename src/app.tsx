import { runApp, IAppConfig } from 'ice';

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
  },
  router: {
    type: 'hash',
  },
  request: {
    baseURL: 'https://www.fastmock.site/mock/1abfdbef20cc77de628b0bdb07b4868f/',
  },
};

runApp(appConfig);
