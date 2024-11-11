import { $, $$ } from '@wdio/globals';

class ChatPage {
    // Selectors
    get messagesContainer() { return $('[data-testid="messages-container"]') }
    get messageInput() { return $('[data-testid="message-input"]') }
    get sendButton() { return $('[data-testid="send-button"]') }
    get messageItems() { return $$('[data-testid="message-item"]') }

    // Actions
    async waitForChatRoom() {
        await this.messagesContainer.waitForDisplayed();
    }

    async sendMessage(message) {
        await this.messageInput.setValue(message);
        await this.sendButton.click();
    }

    async getLastMessage() {
        const messages = await this.messageItems;
        return messages[await messages.length - 1];
    }

    async getMessageCount() {
        const messages = await this.messageItems;
        return messages.length;
    }

    async isMessageHistoryVisible() {
        const messages = await this.messageItems;
        return await messages.length > 0;
    }
}

export const chatPage = new ChatPage();
