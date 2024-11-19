import { Given, When, Then } from '@cucumber/cucumber';
import axios from 'axios';
import { expect } from '@wdio/globals';

let response: any;
let token: string;

Given("I have a valid user token", async () => {
  const res = await axios.post('http://localhost:3001/api/login', {
    username: 'testuser',
    password: 'password123'
  });
  token = res.data.token;
});

When("I send a GET request to {string}", async (endpoint: string) => {
  try {
    response = await axios.get(`http://localhost:3001${endpoint}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
  } catch (error: any) {
    response = error.response;
  }
});

When("I send a POST request to {string} with:", async (endpoint: string, table: any) => {
  const data = table.rowsHash();
  try {
    response = await axios.post(`http://localhost:3001${endpoint}`, data, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
  } catch (error: any) {
    response = error.response;
  }
});

Then("the response status should be {int}", async (statusCode: number) => {
  expect(response.status).toEqual(statusCode);
});

Then("the response should contain:", async (table: any) => {
  const expected = table.rowsHash();
  for (const key in expected) {
    if (expected[key] === '<any value>') {
      expect(response.data[key]).toBeDefined();
    } else {
      expect(response.data[key]).toEqual(expected[key]);
    }
  }
});
