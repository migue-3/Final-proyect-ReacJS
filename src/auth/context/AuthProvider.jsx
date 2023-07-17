import { useReducer } from 'react';
import { types } from '../types/types';
import { AuthContext } from './AuthContext';
import { AuthReducer } from './AuthReducer';
import { fetchUser } from '../helpers/fetchUser';
import { fetchSignup } from '../helpers/fetchSignup';

const init = () => {
  const user = (localStorage.getItem('authState.user') 
                ?
                 JSON.parse(localStorage.getItem('authState.user'))
                :
                 null);

  return{
    user: user
  }
}
export const AuthProvider = ({children}) => {
  
  const [ authState, dispatch ] = useReducer(AuthReducer, {}, init);
  
 const login = async (formState) =>{
   
  const user = await fetchUser(formState);
    if (user){
      const action = { type: types.login, payload: user};
    
      localStorage.setItem('authState.user',JSON.stringify(user));
       dispatch(action);
    }
  };
  
 const signup = async(formState) =>{

   const user = await fetchSignup(formState);

   const action = { type: types.signup, payload: user}

  localStorage.setItem('authState.user', JSON.stringify(user));

   dispatch(action);
 };

 const logout = () =>{
  const action = { type: types.logout};
  localStorage.removeItem('authState.user');
  dispatch(action)
 };


   return (
     <AuthContext.Provider value={{
       authState,
       login: login,
       logout: logout,
       signup: signup
     }}>
         {children}
     </AuthContext.Provider>
   );
 }
