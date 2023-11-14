import React from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import "./_NavBar.scss";
import { useNavigate } from "react-router-dom";

const isUserAuthenticated = false;

export const NavBar = () => {
  const navigate = useNavigate();
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
