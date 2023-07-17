import { useContext, useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import { NavBar } from "../../ui/components/NavBar";
import { MenuContext } from "../context/MenuContext";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Grid } from "@mui/material";

export const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { menuState } = useContext(MenuContext);

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
        break;
      }
    }
  }, [id]);

  const toHome = () => {
    navigate("/", {
      replace: true,
    });
  };

  return (
    <>
      <NavBar />
      <div className="row d-flex mt-5 edit">
        <div className="col-6">
          <form>
            <h4 className="d-flex justify-content-center align-items-center">
              Details Recipe
            </h4>
            <hr className="hr-custom"/>
            <div className="div d-flex justify-content-center align-items-center mb-2">
            <img
              src={formState.imagePath}
              alt="Receta"
              className="recipe-card-image"
            />
            </div>
            <hr className="hr-custom"/>
            <pre className="mb-0"><strong>Name:</strong></pre>
            <textarea
              type="text"
              className="form-control"
              readOnly
              name="name"
              value={formState.name}
            />
            <hr className="hr-custom"/>
            <pre className="mb-0"><strong>Description:</strong></pre>
            <textarea
              type="text"
              className="form-control mt-1"
              name="description"
              readOnly
              value={formState.description}
            />
            <hr className="hr-custom"/>
            <pre className="mb-0"><strong>Ingredients:</strong></pre>
            <textarea
              readOnly
              type="text"
              className="form-control mt-1"
              name="ingredients"
              value={formState.ingredients}
            />

            <Grid container spacing={2} sx={{ mb: 0, mt: 0 }}>
              <Grid item xs={12}>
                <Button onClick={() => toHome()} variant="contained" fullWidth>
                  Back to home
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </>
  );
};
