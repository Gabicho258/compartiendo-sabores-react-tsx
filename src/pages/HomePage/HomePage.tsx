import { NavBar } from "../../components/NavBar/NavBar";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import "./_HomePage.scss";

export const HomePage = () => {
  return (
    <>
      <NavBar />
      <div className="homePage">
        <h1 className="homePage__title">Compartiendo Sabores!</h1>
        <div className="homePage__mainBox">
          <div className="homePage__mainBox-searchBar">
            {/* <SearchBar /> */}
          </div>
          <div className="homePage__mainBox-categoryCarousel">
            Carrusel de categorías
          </div>
        </div>
      </div>
    </>
  );
};
