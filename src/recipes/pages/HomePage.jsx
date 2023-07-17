import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import { useFetchRecipes } from "../hooks/useFetchRecipes";
import { NavBar } from "../../ui/components/NavBar";
import { RecipeCard } from "../components/RecipeCard";
import { useForm } from "../../hooks/useForm";
import { Button, Grid} from '@mui/material';

export const HomePage = () => {
  const { authState } = useContext(AuthContext);

  const { recipes, setData } = useFetchRecipes();

  const {formState, name, description, ingredients, imagePath, onInputChange} = useForm({
    name: "",
    description: "",
    ingredients: "",
    imagePath: "",
  });

  useEffect(() => {
    setData(true);
  }, []);

  const handleAdd = async (event) => {
    event.preventDefault();
    const input = ingredients;
    const arreglos = input.split(",");
    const arrayObject = arreglos.map((arreglo) => {
      const [arreglos] = arreglo.split(":");
      return { name: arreglos };
    });

    const newFood = {
      ...formState,
      ingredients: arrayObject,
    };

    try {
      const url = `https://backend-recipes-bootcamps-tribe.onrender.com/api/recipes/add?auth=${authState.user.idToken}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFood),
      });

      if (response.ok) {
        const menuResp = await response.json();
        setData(true);
        return menuResp;
      }
    } catch (error) {
      console.error("Error de red:", error.msg);
    }
  };

  return (
    <>
      <NavBar />
      <div className="row">
      <h1 className="d-flex align-items-center mt-3 m-4 mb-1">Recipe list</h1>

        <div className="col-7 row rows-cols-1 row-cols-md-2 g-2">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
        <div className="col-5">
          <form onSubmit={handleAdd} className="position">
            <h4 className="d-flex justify-content-center">Add recipe</h4>
            <input
              type="text"
              placeholder="name"
              className="form-control"
              required
              title="Campo requerido"
              name="name"
              value={name}
              onChange={onInputChange}
            />

            <input
              type="text"
              placeholder="description"
              className="form-control mt-1"
              name="description"
              required
              title="Campo requerido"
              value={description}
              onChange={onInputChange}
            />

            <input
              pattern="[a-zA-Z0-9,_]+"
              title="Solo se permiten números, letras y comas"
              required
              type="text"
              placeholder="ingredients"
              className="form-control mt-1"
              name="ingredients"
              value={ingredients}
              onChange={onInputChange}
            />

            <input
              type="text"
              placeholder="imagePath"
              className="form-control mt-1"
              name="imagePath"
              required
              title="Campo requerido"
              value={imagePath}
              onChange={onInputChange}
            />
            <Grid container spacing={2} sx={{ mb: 1, mt: 0 }}>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </>
  );
};
