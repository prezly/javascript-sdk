global.fetch = require('jest-fetch-mock');
global.fetchMock = global.fetch;
jest.setMock('node-fetch', global.fetch);
