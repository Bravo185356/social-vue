import { userData } from '../user/userModel';
import { friendsData } from './friendsData';
import { authUser } from '../auth/authData';

export class FriendsController {
  static getFriends(userId) {
    const friends = friendsData.filter((friend) => friend.whose == userId);
    return JSON.stringify(friends);
  }

  static deleteFriendFromData(deletedFriendId) {
    const userIndex = friendsData.findIndex((friend) => friend.id == deletedFriendId && friend.whose == authUser.id);
    friendsData.splice(userIndex, 1);

    const authUserIndex = friendsData.findIndex((friend) => friend.id == authUser.id && friend.whose == deletedFriendId);
    friendsData.splice(authUserIndex, 1);
  }

  static addFriend(userId) {
    const {
      name: authName,
      surname: authSurname,
      status: authStatus,
      city: authCity,
    } = userData.find((user) => user.id == authUser.id);

    const newFriendAuthId = {
      id: authUser.id,
      whose: userId,
      name: authName,
      surname: authSurname,
      status: authStatus,
      city: authCity,
    };
    friendsData.push(newFriendAuthId);

    const { name, surname, status, city } = userData.find((user) => user.id == userId);
    const newFriendUserId = {
      id: userId,
      whose: authUser.id,
      name,
      surname,
      status,
      city,
    };
    friendsData.push(newFriendUserId);
  }
  
  static getFilteredFriendList(query, userId) {
    const keys = Object.keys(query);

    const friends = friendsData.filter((friend) => friend.whose == userId);

    const result = friends.filter((user) => {
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
}
