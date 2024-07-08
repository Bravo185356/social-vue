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
    const friends = friendsData.filter((friend) => friend.whose == userId);
    const result = [];
    const queryEntries = Object.entries(query);

    for (let i = 0; i < friends.length; i++) {
      const friend = friends[i];
      let proccessedQueryCount = 0;

      for (const [queryKey, queryValue] of queryEntries) {
        if ((queryKey === 'status' && queryValue === 'all') || friend.status === queryValue) {
          proccessedQueryCount = proccessedQueryCount + 1;
        } else if (queryKey === 'name' && !query['surname']) {
          if (friend[queryKey] === queryValue || friend['surname'] === queryValue) {
            proccessedQueryCount = proccessedQueryCount + 1;
          }
        } else if (friend[queryKey] === queryValue) {
          proccessedQueryCount = proccessedQueryCount + 1;
        }
      }

      if (proccessedQueryCount === queryEntries.length) {
        result.push(friend)
      }
    }

    return JSON.stringify(result);
  }
}
