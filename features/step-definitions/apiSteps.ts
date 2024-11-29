import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@wdio/globals';
import { sendRequest } from '../support/api';

let token: string;
let response: any;

Given('I have a valid user token', async () => {
  const loginData = { username: 'testuser', password: 'password123' };
  const res = await sendRequest('POST', '/api/login', loginData);
  expect(res?.status).toEqual(200);
  token = res?.data.token;
});

When('I send a GET request to {string}', async (endpoint: string) => {
  response = await sendRequest('GET', endpoint, undefined, token);
});

When('I send a POST request to {string} with:', async (endpoint: string, table: any) => {
  const requestData = table.rowsHash();
  response = await sendRequest('POST', endpoint, requestData, token);
});

Then('the response status should be {int}', async (statusCode: number) => {
  expect(response?.status).toEqual(statusCode);
});

Then('the response should contain:', async (table: any) => {
  const expectedData = table.rowsHash();
  for (const key in expectedData) {
    const expectedValue = expectedData[key];
    if (expectedValue === '<any value>') {
      expect(response?.data[key]).toBeDefined();
    } else {
      expect(response?.data[key]).toEqual(expectedValue);
    }
  }
});
