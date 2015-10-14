import server from './server';

export default {
  options: {
    server: server.options,
    selenium: {
      version: '2.47.1',
      drivers: {
        chrome: {
          version: '2.18',
          arch: process.arch,
          baseURL: 'http://chromedriver.storage.googleapis.com'
        }
      }
    }
  }
}