import { authUser } from '../auth/authData'
import { requestsData } from './requestsData'

export class RequestsController {
  static getRequests() {
    return JSON.stringify(requestsData.filter(request => request.userId === authUser.id))
  }

  static getSendedRequests() {
    return JSON.stringify(requestsData.filter(request => request.requestCreator.id === authUser.id))
  }

  static createRequest(userId) {
    const newRequest = {
      id: Date.now(),
      userId,
      requestCreator: {
        id: authUser.id,
        name: authUser.name,
        surname: authUser.surname,
      },
    }

    requestsData.push(newRequest)
    return newRequest
  }

  static deleteRequest(requestId) {
    const requestIndex = requestsData.findIndex(request => request.id === requestId)
    requestsData.splice(requestIndex, 1)
  }
}
