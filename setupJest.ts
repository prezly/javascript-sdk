import { GlobalWithFetchMock } from 'jest-fetch-mock';

// As suggested in jest-fetch-mock docs
// https://github.com/jefflau/jest-fetch-mock#typescript-guide
// With addition of node-fetch mock implementation.
const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;
customGlobal.fetch = require('jest-fetch-mock');
customGlobal.fetchMock = customGlobal.fetch;
jest.setMock('node-fetch', customGlobal.fetch);
