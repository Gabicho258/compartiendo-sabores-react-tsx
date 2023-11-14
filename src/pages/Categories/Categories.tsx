import { Paper, Typography } from "@mui/material";
import "./_Categories.scss";
import { RecipeCard } from "../../components/RecipeCard/RecipeCard";
import { NavBar } from "../../components/NavBar/NavBar";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { recetas } from "../../static_test/recipes";
import { useSearch } from "../../hooks/useSearch";
import { useParams } from "react-router";

export const Categories = () => {
  const { text, result, onChangeInput } = useSearch({ data: recetas });
  const { category } = useParams();
  console.log(category);
  // console.log(result);
  return (
    <>
      <NavBar />
      <div className="category__container">
        <Typography
          variant="h4"
          component="h1"
          className="category__container-title"
        >
          <b>{category}</b>
        </Typography>
        <div className="category__container-searchBar">
          <SearchBar text={text} onChangeInput={onChangeInput} />
        </div>
        <Paper
          sx={{
            p: 5,
            margin: "auto",
            maxWidth: 600,
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1A2027" : "#fff",
          }}
          className="category__container-paper"
        >
          {result.map(({ average_rating, title, images, views }, index) => (
            <RecipeCard
              average_rating={average_rating}
              title={title}
              images={images}
              views={views}
              user_name="Temporal"
              key={index}
            />
          ))}
        </Paper>
      </div>
    </>
  );
};
