import { authUser } from '../auth/authData';
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
    const keys = Object.keys(query);

    const result = userData.filter((user) => {
      let queryNum = 0;

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (key === 'status' && query[key] === 'all') {
          queryNum = queryNum + 1;
        } else if (user[key] === query[key] && key !== 'status') {
          queryNum = queryNum + 1;
        } else if (key === 'status' && query[key] === 'online' && user.status === 'online') {
          queryNum = queryNum + 1;
        }
      }

      if (queryNum === keys.length) {
        return true;
      }
    });

    return JSON.stringify(result);
  }

  static getUnreadedDialogs(userId) {
    return JSON.stringify(userData.find((user) => user.id == userId).unreadDialog);
  }
}
