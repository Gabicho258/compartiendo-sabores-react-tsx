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
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateChatMutation,
  useGetRecipesQuery,
  useGetUserByIdQuery,
} from "../../app/apis/compartiendoSabores.api";

export const UserProfile = () => {
  const [value, setValue] = useState(0);
  const isUserAuthenticated = localStorage.getItem("data");
  const userCredentials =
    isUserAuthenticated && JSON.parse(isUserAuthenticated);
  const { id } = useParams();

  const isOwnProfile = id ? id === userCredentials.id : true;
  const { data: user } = useGetUserByIdQuery(
    isOwnProfile ? userCredentials.id : id
  );
  const { data: recipes } = useGetRecipesQuery();
  const [createChat, { isLoading }] = useCreateChatMutation();
  const isCompanyAccount = user?.role === "Empresa";
  const myRecipes = recipes?.filter((recipe) => recipe.user_id === user?._id);
  const myFavoriteRecipes = recipes?.filter((recipe) =>
    user?.favorites.includes(recipe._id)
  );
  const navigate = useNavigate();
  const handleOpenChat = async () => {
    try {
      await createChat({
        owner_id: userCredentials.id,
        friend_id: id || "",
      }).unwrap();
      navigate("/chat");
    } catch (error: any) {
      alert(JSON.stringify(error.data));
    }
  };
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
                onClick={handleOpenChat}
                disabled={isLoading}
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
                      key={item._id}
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
                  {myFavoriteRecipes?.map(({ images, _id, title }) => (
                    <ImageListItem
                      key={_id}
                      onClick={() => {
                        navigate(`/recipe/${_id}`);
                      }}
                    >
                      <img
                        src={images[0]}
                        alt={title}
                        className="userProfile__recipesTab-favorites-img"
                      />
                    </ImageListItem>
                  )) || (
                    <ImageListItem key={Math.random()}>
                      <img
                        src="https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
                        alt="No images available"
                        className="userProfile__recipesTab-favorites-img"
                      />
                    </ImageListItem>
                  )}
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
