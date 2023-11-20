import { NavBar } from "../../components/NavBar/NavBar";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { recetas } from "../../static_test/recipes";
import { RecipeCard } from "../../components/RecipeCard/RecipeCard";
import CategoryCarousel from "../../components/Carousel/Carousel";
import { useSearch } from "../../hooks/useSearch";
import "./_HomePage.scss";

export const HomePage = () => {
  const { text, result, onChangeInput } = useSearch({ data: recetas });
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
            </div>
          )}
        </div>
      </div>
    </>
  );
};
