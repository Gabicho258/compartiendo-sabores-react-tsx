import { Button } from "@mui/material";
import "./_ButtonAddRecipe.scss";
import { useNavigate } from "react-router-dom";
export const ButtonAddRecipe = () => {
  const navigate = useNavigate();
  return (
    <Button
      id="buttonAddRecipe"
      onClick={() => {
        navigate("/createRecipe");
      }}
    >
      <strong>
        Nueva receta <span>+</span>
      </strong>
    </Button>
  );
};
