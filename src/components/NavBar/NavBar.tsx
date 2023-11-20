import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import "./_NavBar.scss";
import { useNavigate } from "react-router-dom";
import { useGetUserByIdQuery } from "../../app/apis/compartiendoSabores.api";

export const NavBar = () => {
  const isUserAuthenticated = localStorage.getItem("data");
  const userCredentials =
    isUserAuthenticated && JSON.parse(isUserAuthenticated);
  const navigate = useNavigate();
  // console.log(isUserAuthenticated);
  const { data } = useGetUserByIdQuery(userCredentials?.id);
  return (
    <>
      <div className="navBarContainer">
        <img
          className="navBarContainer__icon"
          alt="image_profile"
          src="https://cdn-icons-png.flaticon.com/512/526/526190.png"
        ></img>
        {isUserAuthenticated ? (
          <>
            <div className="navBarContainer__profile">
              <div className="navBarContainer__profile-name">
                {data?.first_name} {data?.last_name}
              </div>
              <Avatar
                className="navBarContainer__profile-image"
                alt="Juan Perez"
                src={data?.photo_url}
              />
            </div>
          </>
        ) : (
          <>
            <div className="navBarContainer__buttons">
              <Button
                className="navBarContainer__buttons-btn"
                variant="contained"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Regístrate
              </Button>
              <Button
                className="navBarContainer__buttons-btn"
                variant="contained"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Ingresar
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
