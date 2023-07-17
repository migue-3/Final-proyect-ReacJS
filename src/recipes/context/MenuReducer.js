import { types } from "../types/types";


export const MenuReducer = (menuState = {}, action) => {

    switch (action.type) {
        case types.getMenu:
            return [
                ...action.payload
            ]  
            
        default:
            return menuState;
    }
}