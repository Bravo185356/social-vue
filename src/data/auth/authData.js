import { userData } from '../user/userModel';

let authUser = {};

class AuthController {
  static getUser(login, password) {
    const user = userData.find((user) => user.login === login && user.password === password);

    if (user) {
      const authResponse = {
        id: user.id,
        name: user.name,
        surname: user.surname,
        city: user.city,
        settings: user.settings,
        unreadDialog: user.unreadDialog,
      };

      authUser = authResponse;
      return JSON.stringify(authResponse);
    } else {
      return JSON.stringify({ error: 'Неверный логин или пароль' });
    }
  }

  static getUserWithToken(token) {
    const user = userData.find((user) => user.id == token);
    authUser = user;

    const authResponse = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      city: user.city,
      settings: user.settings,
      unreadDialog: user.unreadDialog,
    };

    return JSON.stringify(authResponse);
  }

  static createUser(data) {
    const newUser = {
      ...data,
      id: Date.now(),
      status: 'offline',
      unreadDialog: [],
      settings: { allowOtherUsersCreatePost: false },
    };

    userData.push(newUser);
  }
}

export { AuthController, authUser };
