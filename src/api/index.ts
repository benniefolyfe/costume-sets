import axios from "axios";

const BASE_URL = "https://habitica.com/api/v3/";

interface endpoints {
    USER: string,
    CONTENT: string,
}

export const ENDPOINTS: endpoints = {
  USER: "user",
  CONTENT: "content"
};


export const createAPIEndpoint = (endpoint:string) => {
  const AUTHOR_ID = "5bde0b79-bc72-42e8-a52b-281398b98de9";
  const USER_ID = "5bde0b79-bc72-42e8-a52b-281398b98de9";
  const API_TOKEN = "d650f75c-efd3-4256-a607-8d19d77dfd4c";
  let url = BASE_URL + endpoint + "/";
  return {
    // Get user
    getUser: () =>
      axios.get(url, {
        headers: {
          "x-client": AUTHOR_ID,
          "x-api-user": USER_ID,
          "x-api-key": API_TOKEN,
        },
      }),
    updateUser: (payload: any) =>
      axios.put(url, payload, {
        headers: {
          "x-api-user": USER_ID,
          "x-api-key": API_TOKEN,
        },
      }),
    useUserBlessing: (payload: {}) =>
      axios.post(`${url}class/cast/healAll`, payload, {
        headers: {
            "x-api-user": USER_ID,
            "x-api-key": API_TOKEN,
        },
      }),
    getGameContent: () => 
        axios.get(url, {
        headers: {
          "x-client": AUTHOR_ID,
          "x-api-user": USER_ID,
          "x-api-key": API_TOKEN,
        },
      }),
  };
};
