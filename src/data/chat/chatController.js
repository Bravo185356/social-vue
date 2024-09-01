import { UserController } from '../user/userController'
import { userData } from '../user/userModel'
import { authUser } from '../auth/authData'
import { chatData } from './chatModel'

export class ChatController {
  static getChats() {
    const chats = []

    chatData.forEach((chat) => {
      const user = chat.users.find(user => user.id === authUser.id)

      if (user) {
        const otherUser = chat.users.find(user => user.id !== authUser.id)
        const lastMessage = chat.messages[chat.messages.length - 1]
        let chatLastMessage

        if (lastMessage) {
          chatLastMessage = {
            author: { id: lastMessage.author.id, name: lastMessage.author.name },
            text: lastMessage.text,
          }
        } else {
          chatLastMessage = 'Черновик'
        }

        const chatItem = {
          id: chat.id,
          lastMessage: chatLastMessage,
          user: { id: otherUser.id, name: otherUser.name, surname: otherUser.surname },
        }

        chats.push(chatItem)
      }
    })

    return chats
  }

  static createChat(chatBody) {
    chatData.push(chatBody)
  }

  static getEmptyChatItem(userId) {
    const { id, name, surname } = JSON.parse(UserController.fetchUser(userId))

    const newChatItem = {
      id: Date.now(),
      user: {
        id,
        name,
        surname,
      },
      lastMessage: {},
    }

    return newChatItem
  }

  static getChatMessages(userId, chatId) {
    const chat = chatData.find(chat => chat.id === chatId)

    if (chat) {
      return JSON.stringify(chat)
    } else {
      const users = userData.filter(user => user.id === userId || user.id === authUser.id)
      return JSON.stringify({ id: Date.now(), messages: [], users })
    }
  }

  static createMessage(messageBody, chatId) {
    const chat = chatData.find(chat => chat.id === chatId)
    chat.messages.push(messageBody)
  }

  static removeMessage(messageId, chatId) {
    const chat = chatData.find(chat => chat.id === chatId)

    const messageIndex = chat.messages.findIndex(msg => msg.id === messageId)
    chat.messages.splice(messageIndex, 1)

    if (!chat.messages.length) {
      this.deleteChatItem(chat.id)
    }
  }

  static deleteChatItem(id) {
    const chatIndex = chatData.findIndex(chatItem => chatItem.id === id)
    chatData.splice(chatIndex, 1)
  }

  static editMessageText(chatId, messageId, messageText) {
    const chat = chatData.find(chat => chat.id === chatId)
    chat.messages.find(message => message.id === messageId).text = messageText
  }
}
