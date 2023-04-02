import { createAPIEndpoint, ENDPOINTS } from '../api';
import { HabiticaUserAPI } from '../api/interfaces';

export const getGameData = async (apiUserDetails: HabiticaUserAPI) => {
    try {
        const res = await createAPIEndpoint(ENDPOINTS.CONTENT).getGameContent(apiUserDetails);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};