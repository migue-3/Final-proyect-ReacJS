import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import { MenuContext } from "../context/MenuContext";

export const useFetchRecipes = () => {

    const {authState} = useContext(AuthContext);
    const {getMenu, menuState} = useContext(MenuContext);
    const [data, setData] = useState(false);

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(menuState);
  // console.log('menuState>>>',menuState)
  }, [menuState])
  

  const getFood = async() => {
    // const newFood = await fetchMenu( authState.user.idToken );
    getMenu();
    //  setRecipes(newFood);
     setData(false);
  }

   useEffect( () => {
    if(data) {
      getFood();
    }
   }, [data])

  return {
    recipes,
    setData
  }
}
