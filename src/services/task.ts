import { createAPIEndpoint, ENDPOINTS } from '../api'
import { HabiticaUserAPI } from '../api/interfaces';

export const createTaskForUser = async (apiUserDetails: HabiticaUserAPI, payload: any) => {
    try {
        const res = await createAPIEndpoint(ENDPOINTS.TASKS).createTask(apiUserDetails, payload);
        return res.data;
    } catch (err) {
        console.log(err);
    } 
};

export const scoreTaskForUser = async (apiUserDetails: HabiticaUserAPI, taskId: string, direction: string) => {
    try {
        const res = await createAPIEndpoint(ENDPOINTS.TASKS).scoreTask(apiUserDetails, taskId, direction);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const deleteTaskForUser = async (apiUserDetails: HabiticaUserAPI, taskId: string) => {
    try {
        const res = await createAPIEndpoint(ENDPOINTS.TASKS).deleteTask(apiUserDetails, taskId);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

