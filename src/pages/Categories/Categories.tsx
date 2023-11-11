import { ButtonBase, Container, Grid, Paper, Typography } from "@mui/material";
import "./_Categories.scss";
import { RecipeCard } from "../../components/RecipeCard/RecipeCard";

export const Categories = () => {
  return (
    <>
      {/* Navbar */}
      <Container maxWidth="sm" className="category__container">
        <Typography
          variant="h4"
          component="h1"
          className="category__container-title"
        >
          <b>Categoría</b>
        </Typography>
        <p>search component</p>
        <Paper
          sx={{
            p: 5,
            margin: "auto",
            maxWidth: 600,
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1A2027" : "#fff",
          }}
        >
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
        </Paper>
      </Container>
    </>
  );
};
