import axios from "axios";
import { HabiticaUserAPI } from "./interfaces";

const BASE_URL = "https://habitica.com/api/v3/";

interface endpoints {
  USER: string,
  CONTENT: string,
  GROUPS: string,
  TASKS: string,
}

export const ENDPOINTS: endpoints = {
  USER: "user",
  CONTENT: "content",
  GROUPS: 'groups',
  TASKS: 'tasks'
};

export const createAPIEndpoint = (endpoint: string) => {
  const AUTHOR_ID = "5bde0b79-bc72-42e8-a52b-281398b98de9";

  const url = BASE_URL + endpoint + "/";

  return {
    // USER ENDPOINT
    getUser: (apiUserDetails: HabiticaUserAPI) =>
      axios.get(url, {
        headers: {
          "x-client": AUTHOR_ID,
          "x-api-user": apiUserDetails.userId,
          "x-api-key": apiUserDetails.apiToken,
        },
      }),
    updateUser: (apiUserDetails: HabiticaUserAPI, payload: any) =>
      axios.put(url, payload, {
        headers: {
          "x-client": AUTHOR_ID,
          "x-api-user": apiUserDetails.userId,
          "x-api-key": apiUserDetails.apiToken,
        },
      }),
    useUserBlessing: (apiUserDetails: HabiticaUserAPI, payload: {}) =>
      axios.post(`${url}class/cast/healAll`, payload, {
        headers: {
          "x-client": AUTHOR_ID,
          "x-api-user": apiUserDetails.userId,
          "x-api-key": apiUserDetails.apiToken,
        },
      }),

    // CONTENT ENDPOINT
    getGameContent: (apiUserDetails: HabiticaUserAPI) =>
      axios.get(url, {
        headers: {
          "x-client": AUTHOR_ID,
          "x-api-user": apiUserDetails.userId,
          "x-api-key": apiUserDetails.apiToken,
        },
      }),

    // TASKS ENDPOINT 
    createTask: (apiUserDetails: HabiticaUserAPI, payload: any) =>
      axios.post(`${url}user`, payload, {
        headers: {
          "x-client": AUTHOR_ID,
          "x-api-user": apiUserDetails.userId,
          "x-api-key": apiUserDetails.apiToken,
        },
      }),
    scoreTask: (apiUserDetails: HabiticaUserAPI, taskId: string, direction: string) =>
      axios.post(`${url}${taskId}/score/${direction}`, taskId, {
        headers: {
          "x-client": AUTHOR_ID,
          "x-api-user": apiUserDetails.userId,
          "x-api-key": apiUserDetails.apiToken,
        },
      }),
    deleteTask: (apiUserDetails: HabiticaUserAPI, taskId: string) =>
      axios.delete(`${url}${taskId}`, {
        headers: {
          "x-client": AUTHOR_ID,
          "x-api-user": apiUserDetails.userId,
          "x-api-key": apiUserDetails.apiToken,
        },
      }),
  };
};
