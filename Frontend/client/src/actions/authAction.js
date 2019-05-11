import axios from "axios";
export const GET_TOKEN = 'get_token';

export const getToken = (responseData) => {
    return {
        type: GET_TOKEN,
        payload: {
            token : responseData.token,
            isAuth : responseData.isAuth,
            uid: responseData.uid
        }
    };
};
