import { userData } from '../user/userModel'
import { authUser } from '../auth/authData'
import { handleUserQueryParams } from '../utils/handleUserQueryParams'
import { friendsData } from './friendsData'

export class FriendsController {
  static getFriends(userId) {
    const friends = friendsData.filter(friend => friend.whose === +userId)
    return JSON.stringify(friends)
  }

  static deleteFriendFromData(deletedFriendId) {
    const userIndex = friendsData.findIndex(friend => friend.id === deletedFriendId && friend.whose === authUser.id)
    friendsData.splice(userIndex, 1)

    const authUserIndex = friendsData.findIndex(friend => friend.id === authUser.id && friend.whose === deletedFriendId)
    friendsData.splice(authUserIndex, 1)
  }

  static addFriend(userId) {
    const {
      name: authName,
      surname: authSurname,
      status: authStatus,
      city: authCity,
    } = userData.find(user => user.id === authUser.id)

    const newFriendAuthId = {
      id: authUser.id,
      whose: userId,
      name: authName,
      surname: authSurname,
      status: authStatus,
      city: authCity,
    }
    friendsData.push(newFriendAuthId)

    const { name, surname, status, city } = userData.find(user => user.id === userId)
    const newFriendUserId = {
      id: userId,
      whose: authUser.id,
      name,
      surname,
      status,
      city,
    }
    friendsData.push(newFriendUserId)
  }

  static getFilteredFriendList(query, userId) {
    const filteredUsers = []
    const friends = friendsData.filter(friend => friend.whose === userId)

    for (let i = 0; i < friends.length; i++) {
      const user = friends[i]
      const result = handleUserQueryParams(user, query)

      if (result) {
        filteredUsers.push(result)
      }
    }

    return JSON.stringify(filteredUsers)
  }
}
