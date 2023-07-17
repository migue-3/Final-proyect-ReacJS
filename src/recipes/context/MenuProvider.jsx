import { useContext, useReducer } from "react";
import { MenuContext } from "./MenuContext";
import { MenuReducer } from "./MenuReducer";
import { types } from "../types/types";
import { fetchMenu } from "../helpers/fetchMenu";
import { AuthContext } from "../../auth/context/AuthContext";

 const initialState = [];

export const MenuProvider = ({children}) => {

    const [ menuState, dispatch ] = useReducer(MenuReducer, initialState);
    const {authState} = useContext(AuthContext);

    
    const getMenu = async() =>{
       const menu = await fetchMenu(authState.user.idToken);
        const action = { type: types.getMenu, payload: menu};
        dispatch(action);
    }
    
  return (
    <MenuContext.Provider value={{
        menuState,
        getMenu: getMenu
      }}>
          {children}
      </MenuContext.Provider>
    );
}
