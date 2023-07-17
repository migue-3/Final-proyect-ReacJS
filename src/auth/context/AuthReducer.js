import { types } from "../types/types";


export const AuthReducer = (authState = {}, action) => {

    switch (action.type) {
        case types.login:
            return {
                ...authState,
                user: action.payload
            };
        
        case types.signup:
            return {
                ...authState,
                user: action.payload
            };
        
        case types.logout:
            return {
                ...authState,
                user: null
            };

        default:
            return authState;
    }
}