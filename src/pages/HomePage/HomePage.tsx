import { NavBar } from "../../components/NavBar/NavBar";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { RecipeCard } from "../../components/RecipeCard/RecipeCard";
import CategoryCarousel from "../../components/Carousel/Carousel";
import { useSearch } from "../../hooks/useSearch";
import "./_HomePage.scss";
import { ButtonAddRecipe } from "../../components/ButtonAddRecipe/ButtonAddRecipe";
import { useGetRecipesQuery } from "../../app/apis/compartiendoSabores.api";

export const HomePage = () => {
  const isUserAuthenticated = localStorage.getItem("data");
  const { data } = useGetRecipesQuery();
  const { text, result, onChangeInput } = useSearch({ data: data });
  return (
    <>
      <NavBar />
      <div className="homePage">
        <h1 className="homePage__title">Compartiendo Sabores!</h1>
        <div className="homePage__mainBox">
          <div className="homePage__mainBox-searchBar">
            <SearchBar text={text} onChangeInput={onChangeInput} />
          </div>
          {text === "" ? (
            <div className="homePage__mainBox-categoryCarousel">
              <CategoryCarousel />
            </div>
          ) : (
            <div className="homePage__mainBox-searchResult">
              {result?.map(
                (
                  { average_rating, title, images, views, user_id, _id },
                  index
                ) => (
                  <RecipeCard
                    _id={_id}
                    average_rating={average_rating}
                    title={title}
                    images={images}
                    views={views}
                    user_id={user_id}
                    key={index}
                  />
                )
              )}
            </div>
          )}
        </div>
        {isUserAuthenticated && <ButtonAddRecipe />}
      </div>
    </>
  );
};
