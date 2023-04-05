import { createAPIEndpoint, ENDPOINTS } from '../api'
import { HabiticaUserAPI } from '../api/interfaces';

export const getUserData = async (apiUserDetails: HabiticaUserAPI) => {
    try {
        const res = await createAPIEndpoint(ENDPOINTS.USER).getUser(apiUserDetails);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const updateUserData = async (apiUserDetails: HabiticaUserAPI, payload: any) => {
    try {
        const res = await createAPIEndpoint(ENDPOINTS.USER).updateUser(apiUserDetails, payload);
        return res.data;
    } catch (err) {
        console.log(err)
    }
}

export const useUserBlessing = async (apiUserDetails: HabiticaUserAPI, payload: {}) => {
    try {
        const res = await createAPIEndpoint(ENDPOINTS.USER).useUserBlessing(apiUserDetails, payload);
        console.log(res)
    } catch (err) {
        console.log(err);
    }
}