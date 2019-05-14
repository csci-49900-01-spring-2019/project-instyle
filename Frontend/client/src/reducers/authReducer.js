import {GET_TOKEN} from "../actions/authAction";

const initState = {
    token: "",
    isAuth : false,
    uid:""

}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_TOKEN:
            return action.payload || initState;
        default:
            return state;
    }
}

export default authReducer;