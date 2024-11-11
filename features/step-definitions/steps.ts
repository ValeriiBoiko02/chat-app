import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@wdio/globals";
import { chatPage } from "../pages/ChatPage";
import { loginPage } from "../pages/LoginPage";

Given("I am on the login page", async function () {
  await loginPage.open();
});

When("I enter {string} as username", async function (username) {
  await loginPage.usernameInput.setValue(username);
});

When("I enter {string} as password", async function (password) {
  await loginPage.passwordInput.setValue(password);
});

When("I click the login button", async function () {
  await loginPage.loginButton.click();
});

Then("I should see the chat room", async function () {
  await chatPage.waitForChatRoom();
  await expect(chatPage.messagesContainer).toBeDisplayed();
});

Then("I should see an error message", async function () {
  await expect(loginPage.errorMessage).toBeDisplayed();
});

Given("I am logged in as {string}", async function (username) {
  await loginPage.open();
  await loginPage.login(username, "password123");
  await chatPage.waitForChatRoom();
});

When("I type {string} in the message input", async function (message) {
  await chatPage.messageInput.setValue(message);
});

When("I click the send button", async function () {
  await chatPage.sendButton.click();
});

Then("I should see my message in the chat", async function () {
  const lastMessage = await chatPage.getLastMessage();
  await expect(lastMessage).toBeDisplayed();
});

Given("there are existing messages in the chat", async function () {
  // This step is handled by the test user's messages in the database
});

When("I am in the chat room", async function () {
  await chatPage.waitForChatRoom();
});

Then("I should see the message history", async function () {
  await expect(await chatPage.isMessageHistoryVisible()).toBe(true);
  const lastMessage = await chatPage.getLastMessage();
  await expect(lastMessage).toBeDisplayed();
});
