import axios from "axios";
import { HabiticaUserAPI } from "./interfaces";

const BASE_URL = "https://habitica.com/api/v3/";

interface endpoints {
    USER: string,
    CONTENT: string,
    GROUPS: string,
}

export const ENDPOINTS: endpoints = {
  USER: "user",
  CONTENT: "content",
  GROUPS: 'groups'
};

export const createAPIEndpoint = (endpoint:string) => {
  const AUTHOR_ID = "5bde0b79-bc72-42e8-a52b-281398b98de9";

  let url = BASE_URL + endpoint + "/";
  
  return {
    // Get user
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
    getGameContent: (apiUserDetails: HabiticaUserAPI) => 
        axios.get(url, {
        headers: {
          "x-client": AUTHOR_ID,
          "x-api-user": apiUserDetails.userId,
          "x-api-key": apiUserDetails.apiToken,
        },
      }),
    updateGroup: (id: string) =>
      axios.put(`${url}${id}`, {
        "name": "Hello!"
      }, {
        headers: {
          "x-api-user": "5bde0b79-bc72-42e8-a52b-281398b98de9",
          "x-api-key": "d650f75c-efd3-4256-a607-8d19d77dfd4c",
        },
      }),
  };
};
