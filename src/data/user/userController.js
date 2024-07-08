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
    const result = [];
    const queryEntries = Object.entries(query);

    for (let i = 0; i < userData.length; i++) {
      const user = userData[i];
      let proccessedQueryCount = 0;

      for (const [queryKey, queryValue] of queryEntries) {
        if ((queryKey === 'status' && queryValue === 'all') || user.status === queryValue) {
          proccessedQueryCount = proccessedQueryCount + 1;
        } else if (queryKey === 'name' && !query['surname']) {
          if (user[queryKey] === queryValue || user['surname'] === queryValue) {
            proccessedQueryCount = proccessedQueryCount + 1;
          }
        } else if (user[queryKey] === queryValue) {
          proccessedQueryCount = proccessedQueryCount + 1;
        }
      }

      if (proccessedQueryCount === queryEntries.length) {
        result.push({
          id: user.id,
          name: user.name,
          surname: user.surname,
          city: user.city,
          status: user.status,
        });
      }
    }

    return JSON.stringify(result);
  }

  static getUnreadedDialogs(userId) {
    return JSON.stringify(userData.find((user) => user.id == userId).unreadDialog);
  }
}
