import React from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import "./_NavBar.scss";

const isUserAuthenticated = true;

export const NavBar = () => {
  return (
    <>
      <div className="navBarContainer">
        <img
          className="navBarContainer__icon"
          src="https://cdn-icons-png.flaticon.com/512/526/526190.png"
        ></img>
        {isUserAuthenticated ? (
          <>
            <div className="navBarContainer__profile">
              <div className="navBarContainer__profile-name">Juan Perez</div>
              <Avatar
                className="navBarContainer__profile-image"
                alt="Juan Perez"
                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
              />
            </div>
          </>
        ) : (
          <>
            <div className="navBarContainer__buttons">
              <Button
                className="navBarContainer__buttons-btn"
                variant="contained"
              >
                Regístrate
              </Button>
              <Button
                className="navBarContainer__buttons-btn"
                variant="contained"
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
