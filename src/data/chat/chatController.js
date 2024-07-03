import { UserController } from '../user/userController';
import { userData } from '../user/userModel';
import { chatData } from './chatModel';
import { authUser } from '../auth/authData';

export class ChatController {
  static getDialogs() {
    const dialogs = [];

    chatData.forEach((chat) => {
      const user = chat.users.find((user) => user.id == authUser.id);
      const otherUser = chat.users.find((user) => user.id != authUser.id);

      if (user) {
        const lastMessage = chat.messages[chat.messages.length - 1];

        const dialogItem = {
          id: chat.id,
          lastMessage: {
            author: { id: lastMessage.author.id, name: lastMessage.author.name },
            text: lastMessage.text,
          },
          user: { id: otherUser.id, name: otherUser.name, surname: otherUser.surname },
        };
        dialogs.push(dialogItem);
      }
    });

    return dialogs;
  }

  static createChat(chatBody) {
    chatData.push(chatBody);
  }

  static getEmptyDialogItem(userId) {
    const { id, name, surname } = JSON.parse(UserController.fetchUser(userId))

    const newDialogItem = {
      id: Date.now(),
      user: {
        id,
        name,
        surname,
      },
      lastMessage: {},
    };

    return newDialogItem;
  }

  static getChatMessages(userId, chatId) {
    const chat = chatData.find((chat) => chat.id == chatId);

    if (chat) {
      return JSON.stringify(chat);
    } else {
      // попробовать удалить/заменить
      const users = userData.filter((user) => user.id == userId || user.id == authUser.id);
      return JSON.stringify({ id: Date.now(), messages: [], users });
    }
  }

  static createMessage(messageBody, chatId) {
    const chat = chatData.find((chat) => chat.id == chatId);
    chat.messages = [...chat.messages, messageBody];
  }

  static removeMessage(messageId, chatId) {
    const chat = chatData.find((chat) => chat.id == chatId);
    chat.messages = chat.messages.filter((message) => message.id != messageId);
  }

  static editMessageText(chatId, messageId, messageText) {
    const chat = chatData.find((chat) => chat.id == chatId);
    chat.messages.find((message) => message.id == messageId).text = messageText;
  }
}
