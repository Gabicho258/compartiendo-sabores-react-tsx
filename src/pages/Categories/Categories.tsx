import { Paper, Typography } from "@mui/material";
import "./_Categories.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { RecipeCard } from "../../components/RecipeCard/RecipeCard";
import { NavBar } from "../../components/NavBar/NavBar";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { useSearch } from "../../hooks/useSearch";
import { useParams } from "react-router";
import { useGetRecipesQuery } from "../../app/apis/compartiendoSabores.api";
import { useNavigate } from "react-router-dom";
import { ButtonAddRecipe } from "../../components/ButtonAddRecipe/ButtonAddRecipe";

export const Categories = () => {
  const isUserAuthenticated = localStorage.getItem("data");
  const { data } = useGetRecipesQuery();
  const { category } = useParams();
  const recipes = data?.filter((recipe) => recipe.category === category);
  const navigate = useNavigate();
  const { text, result, onChangeInput } = useSearch({ data: recipes });
  return (
    <>
      <NavBar />
      <div className="category__container">
        <div className="category__container-backBtn">
          <ArrowBackIcon
            className="category__container-backBtn-icon"
            onClick={() => navigate(-1)}
          />
        </div>
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
          {result?.map(
            ({ average_rating, title, images, views, user_id, _id }, index) => {
              return (
                <RecipeCard
                  _id={_id}
                  average_rating={average_rating}
                  title={title}
                  images={images}
                  views={views}
                  user_id={user_id}
                  key={index}
                />
              );
            }
          )}
        </Paper>
        {isUserAuthenticated && <ButtonAddRecipe />}
      </div>
    </>
  );
};
