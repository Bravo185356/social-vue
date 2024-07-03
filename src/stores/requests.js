import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useRequestStore = defineStore('request', () => {
  const requests = ref([]);
  const myRequests = ref([])

  function addMyRequest(request) {
    myRequests.value.push(request)
  }

  function setRequests(requests) {
    myRequests.value = requests
  }
  
  return { requests, myRequests, addMyRequest, setRequests };
});
