import React from "react";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import CallIcon from "@mui/icons-material/Call";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { CustomTabPanel } from "../../components/CustomTabPanel/CustomTabPanel";
import "./_UserProfile.scss";
import { useNavigate } from "react-router-dom";
import {
  useGetRecipesQuery,
  useGetUserByIdQuery,
} from "../../app/apis/compartiendoSabores.api";

const userFavRecipes = [
  {
    img: "https://www.clara.es/medio/2021/12/16/que-comer-hoy-ideas_21beeb02_1200x630.jpg",
    title: "Espirales",
  },
  {
    img: "https://www.cocinacaserayfacil.net/wp-content/uploads/2020/03/Platos-de-comida-que-pides-a-domicilio-y-puedes-hacer-en-casa.jpg",
    title: "Pizza",
  },
];

export const UserProfile = () => {
  const [value, setValue] = useState(0);
  const isUserAuthenticated = localStorage.getItem("data");
  const userCredentials =
    isUserAuthenticated && JSON.parse(isUserAuthenticated);
  const { data: user } = useGetUserByIdQuery(userCredentials.id);
  const isCompanyAccount = user?.role === "Empresa";
  const isOwnProfile = user?.role === "Personal";
  const { data: recipes } = useGetRecipesQuery();
  const myRecipes = recipes?.filter(
    (recipe) => recipe.user_id === userCredentials.id
  );
  const navigate = useNavigate();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="userProfile">
        <div className="userProfile__backBtn">
          <ArrowBackIcon
            className="userProfile__backBtn-icon"
            onClick={() => navigate(-1)}
          />
        </div>
        {isOwnProfile ? (
          <>
            <div
              className="userProfile__editBtn"
              onClick={() => {
                navigate("/edit-profile");
              }}
            >
              <EditIcon className="userProfile__editBtn-icon" />
            </div>
          </>
        ) : (
          <></>
        )}

        <div className="userProfile__container">
          <div className="userProfile__container-grid">
            <div className="userProfile__container-grid-left">
              <Avatar
                className="userProfile__container-grid-left-image"
                alt={user?.first_name}
                src={user?.photo_url}
              />
              <h3 className="userProfile__container-grid-left-name">
                {user?.first_name} {user?.last_name}
                {isCompanyAccount ? (
                  <>
                    <span className="userProfile__container-grid-left-name-companyLabel">
                      Empresa/Negocio
                    </span>
                  </>
                ) : (
                  <></>
                )}
              </h3>
            </div>
            <div className="userProfile__container-grid-right">
              <h2 className="userProfile__container-grid-right-label">
                Recetas Compartidas
              </h2>
              <h2 className="userProfile__container-grid-right-counter">
                {myRecipes?.length}
              </h2>
            </div>
          </div>
          {!isOwnProfile ? (
            <div className="userProfile__container-sendMessage">
              <Button
                variant="contained"
                className="userProfile__container-sendMessage-btn"
              >
                <p className="userProfile__container-sendMessage-btn-label">
                  Enviar mensaje
                </p>
                <SendIcon className="userProfile__container-sendMessage-btn-icon" />
              </Button>
            </div>
          ) : (
            <></>
          )}

          <p className="userProfile__container-userDescription">
            {user?.description}
          </p>
          {isCompanyAccount ? (
            <>
              <div className="userProfile__container-contact">
                <CallIcon className="userProfile__container-contact-icon" />
                <p className="userProfile__container-contact-phone">
                  {user?.phone_number}
                </p>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="userProfile__recipesTab">
          <div className="userProfile__recipesTab-tabs">
            <Tabs
              value={value}
              onChange={(event: React.SyntheticEvent, newValue: number) => {
                setValue(newValue);
              }}
              aria-label="basic tabs example"
            >
              <Tab
                className="userProfile__recipesTab-tabs-recipes"
                label="Publicaciones"
              />
              {isOwnProfile ? (
                <Tab
                  className="userProfile__recipesTab-tabs-favorites"
                  label="Favoritos"
                />
              ) : (
                <></>
              )}
            </Tabs>
          </div>
          <CustomTabPanel value={value} index={0}>
            <div className="userProfile__recipesTab-recipes">
              <ImageList gap={15} cols={5}>
                {myRecipes ? (
                  myRecipes?.map((item) => (
                    <ImageListItem
                      key={item.images[0]}
                      onClick={() => navigate(`/recipe/${item._id}`)}
                    >
                      <img
                        className="userProfile__recipesTab-recipes-img"
                        src={item.images[0]}
                        alt={item.title}
                      />
                    </ImageListItem>
                  ))
                ) : (
                  <p>No se agregaron recetas</p>
                )}
              </ImageList>
            </div>
          </CustomTabPanel>
          {isOwnProfile ? (
            <CustomTabPanel value={value} index={1}>
              <div className="userProfile__recipesTab-favorites">
                <ImageList gap={15} cols={5}>
                  {userFavRecipes.map((item) => (
                    <ImageListItem key={item.img}>
                      <img
                        src={item.img}
                        alt={item.title}
                        className="userProfile__recipesTab-favorites-img"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </div>
            </CustomTabPanel>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
