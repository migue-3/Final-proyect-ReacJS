import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthContext";

export const NavBar = () => {

    const navigate = useNavigate();
    const {logout, authState} = useContext(AuthContext);
  
    const onLogout = () =>{
        logout();
        navigate('/',{
            replace: true
        })
    }

  return (
    <nav className="flex navbar navbar-expand-sm navbar-dark bg-dark p-2">
            
    <Link 
        className="navbar-brand" 
        to="/"
    >
        RecipesFoodApp
    </Link>

    <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
        <ul className="navbar-nav ml-auto">

            <span className='nav-item nav-link text-info'>
                {authState.user?.email}
            </span>
            <button
                className='nav-item nav-link btn'
                onClick={ onLogout }
                >
                    Logout
                </button>
        </ul>
    </div>
</nav>
  )
}
