import { createAPIEndpoint, ENDPOINTS } from '../api';

export const getGameData = async () => {
    try {
        const res = await createAPIEndpoint(ENDPOINTS.CONTENT).getGameContent();
        return res.data;
    } catch (err) {
        console.log(err);
    }
};