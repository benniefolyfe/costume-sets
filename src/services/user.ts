import { createAPIEndpoint, ENDPOINTS } from '../api';

export const getUserData = async () => {
    try {
        const res = await createAPIEndpoint(ENDPOINTS.USER).getUser();
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const updateUserData = async (payload: any) => {
    try {
        const res = await createAPIEndpoint(ENDPOINTS.USER).updateUser(payload);
        return res.data;
    } catch (err) {
        console.log(err)
    }
}

export const useUserBlessing = async (payload: {}) => {
    try {
        const res = await createAPIEndpoint(ENDPOINTS.USER).useUserBlessing(payload);
        console.log(res)
    } catch (err) {
        console.log(err);
    }
}