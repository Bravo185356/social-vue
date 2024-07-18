import { authUser } from '../auth/authData';
import { handleUserQueryParams } from '../utils/handleUserQueryParams';
import { userData } from './userModel';

export class UserController {
  static fetchUser(id) {
    const user = userData.find((user) => user.id == id);
    return JSON.stringify(user);
  }

  static updateSettings(newSettings) {
    const userIndex = userData.findIndex((user) => user.id == authUser.id);
    userData[userIndex].settings = newSettings;
  }

  static getAllUsers() {
    return userData.map((user) => {
      return {
        id: user.id,
        name: user.name,
        surname: user.surname,
        status: user.status,
        city: user.city,
      };
    });
  }

  static getFilteredUserList(query) {
    const filteredUsers = []

    for (let i = 0; i < userData.length; i++) {
      const user = userData[i];
      const result = handleUserQueryParams(user, query)

      if(result) {
        filteredUsers.push(result)
      }
    }

    return JSON.stringify(filteredUsers);
  }

  static getUnreadedDialogs(userId) {
    return JSON.stringify(userData.find((user) => user.id == userId).unreadDialog);
  }
}
