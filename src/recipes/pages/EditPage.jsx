import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import { useForm } from "../../hooks/useForm";
import { NavBar } from "../../ui/components/NavBar";
import { MenuContext } from "../context/MenuContext";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { useFetchRecipes } from "../hooks/useFetchRecipes";
import { Button, Grid, Link } from "@mui/material";


export const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { authState } = useContext(AuthContext);
  const { menuState } = useContext(MenuContext);
  const { setData } = useFetchRecipes();
  const [editResult, setEditResult] = useState(null);

  const { formState, onInputChange } = useForm({
    name: "",
    description: "",
    ingredients: "",
    imagePath: "",
  });

  useEffect(() => {
    for (let i = 0; i < menuState.length; i++) {
      if (menuState[i]._id === id) {
        const editResult = menuState[i];
        const stringArray = editResult.ingredients.map((obj) =>
          [obj.name].join(",")
        );

        onInputChange({
          target: {
            name: "name",
            value: editResult.name,
            name2: "description",
            value2: editResult.description,
            name3: "ingredients",
            value3: stringArray,
            name4: "imagePath",
            value4: editResult.imagePath,
          },
        });
        setEditResult(editResult);
        break;
      }
    }
  }, [id]);

  const editRecipe = async (event) => {
    event.preventDefault();
    const input = formState.ingredients.toString();
    const arreglos = input.split(",");
    const arrayObject = arreglos.map((arreglo) => {
      const [arreglos] = arreglo?.split(":");
      return { name: arreglos };
    });

    const editFood = {
      ...formState,
      ingredients: arrayObject,
      name: formState.name,
      description: formState.description,
      imagePath: formState.imagePath,
    };

    try {
      const url = `https:backend-recipes-bootcamps-tribe.onrender.com/api/recipes/edit/${id}?auth=${authState.user.idToken}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editFood),
      });

      if (response.ok) {
        const data = await response.json();
        setData(true);
        console.log("Recipe editado:", data);
        navigate("/", {
          replace: true,
        });
        return data;
      }
    } catch (error) {
      console.error("Error al editar el recipe:", error.msg);
    }
  };

  return (
    <>
      <NavBar />
      <div className="row d-flex mt-5 edit">
        <div className="col-6">
          <form onSubmit={editRecipe}>
            <h4 className="d-flex justify-content-center align-items-center">
              Edit recipe
            </h4>
            <input
              type="text"
              placeholder="name"
              className="form-control"
              required
              title="Campo requerido"
              name="name"
              value={formState.name}
              onChange={onInputChange}
            />

            <input
              type="text"
              placeholder="description"
              className="form-control mt-1"
              name="description"
              required
              title="Campo requerido"
              value={formState.description}
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
              value={formState.ingredients}
              onChange={onInputChange}
            />

            <input
              type="text"
              placeholder="imagePath"
              className="form-control mt-1"
              name="imagePath"
              required
              title="Campo requerido"
              value={formState.imagePath}
              onChange={onInputChange}
            />

            <Grid container spacing={2} sx={{ mb: 0, mt: 0 }}>
              <Grid item xs={12}>
                <Button color="success" type="submit" variant="contained" fullWidth>
                  Save
                </Button>
              </Grid>
            </Grid>

            <Grid container sx={{ mb: 0, mt: 2 }} direction="row" justifyContent="center">
            <Link component={RouterLink} color="inherit" to="/">
              Back to homePage..
            </Link>
          </Grid>
          </form>
        </div>
      </div>
    </>
  );
};
