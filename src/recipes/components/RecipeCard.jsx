import { useContext} from "react";
import { useFetchRecipes } from "../hooks/useFetchRecipes";
import { AuthContext } from "../../auth/context/AuthContext";
import RecipeRating from "../hooks/useStarRating";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Button, Grid, Link } from "@mui/material";

export const RecipeCard = ({ recipe }) => {
  const { authState } = useContext(AuthContext);
  const { setData, recipes } = useFetchRecipes();
  const navigate = useNavigate();

  const onEdit = (recipe) => {
    navigate(`/edit/${recipe._id}`, {
      replace: true,
    });
  };

  const deleteRecipe = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esto?')){
    try {
      const url = `https://backend-recipes-bootcamps-tribe.onrender.com/api/recipes/delete/${recipe._id}?auth=${authState.user.idToken}`;
      const resp = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (resp.ok) {
          setData(true);
      } else {
        console.log("Error al borrar");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };
  };

  return (
    <>
      <div className="row d-flex justify-content-center mt-2">
        <div className="col-md-6 mb-2 card card-register-option">
          <h4 className="card-title">
            <pre>Name:</pre> {recipe?.name}
            <hr className="mb-0" />
          </h4>
          <RecipeRating />
          {/* <p className="card-text mb-0 mt-1 d-flex justify-content-center align-items-start">
            <strong>Description:</strong> {recipe?.description}
          </p> */}
          <Grid container direction="row" justifyContent="center">
            <Link component={RouterLink} color="inherit" to={`/details/${recipe._id}`}>
              See more details..
            </Link>
          </Grid>
          {/* <div className="card-text mt-0">
            <strong>Ingredients:</strong>
            {recipe.ingredients.map((ingredients, _id) => (
              <div key={ingredients._id}>
                <li>{ingredients.name}</li>
              </div>
            ))}
          </div> */}
          <div className="recipe-card">
            <img
              src={recipe?.imagePath}
              alt="Receta"
              className="recipe-card-image"
            />
          </div>
          {/* <a className="card-text" href={recipe?.imagePath} target="blank">
            <strong>Ver imagen..</strong>
          </a> */}

          <Grid container spacing={2} sx={{ mb: 0, mt: 0}}>
            <Grid item xs={12}>
              <Button type="submit" onClick={() => onEdit(recipe)} variant="contained" fullWidth>
              Edit
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 0, mt: 0}}>
            <Grid item xs={12}>
              <Button color="error" type="submit" onClick={() => deleteRecipe(recipes)} variant="contained" fullWidth>
              Delete
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};
