import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/context/AuthContext";



export const PrivateRoute = ({children}) => {

  const {authState} = useContext(AuthContext);

  return ( authState.user )
            ? children  
            : <Navigate to="/auth/login"/>
}
