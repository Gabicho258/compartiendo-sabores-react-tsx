import React from "react";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import CallIcon from "@mui/icons-material/Call";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import "./_UserProfile.scss";

const userRecipes = [
  {
    img: "https://www.upmenu.com/wp-content/uploads/2022/08/comida-rapida-a-domicilo-1200x900.jpg",
    title: "Sandwich",
  },
  {
    img: "https://www.clara.es/medio/2021/12/16/que-comer-hoy-ideas_21beeb02_1200x630.jpg",
    title: "Espirales",
  },
  {
    img: "https://www.cocinacaserayfacil.net/wp-content/uploads/2020/03/Platos-de-comida-que-pides-a-domicilio-y-puedes-hacer-en-casa.jpg",
    title: "Pizza",
  },
  {
    img: "https://www.upmenu.com/wp-content/uploads/2022/08/comida-rapida-a-domicilo-1200x900.jpg",
    title: "Sandwich",
  },
  {
    img: "https://www.clara.es/medio/2021/12/16/que-comer-hoy-ideas_21beeb02_1200x630.jpg",
    title: "Espirales",
  },
  {
    img: "https://www.cocinacaserayfacil.net/wp-content/uploads/2020/03/Platos-de-comida-que-pides-a-domicilio-y-puedes-hacer-en-casa.jpg",
    title: "Pizza",
  },
  {
    img: "https://www.upmenu.com/wp-content/uploads/2022/08/comida-rapida-a-domicilo-1200x900.jpg",
    title: "Sandwich",
  },
  {
    img: "https://www.clara.es/medio/2021/12/16/que-comer-hoy-ideas_21beeb02_1200x630.jpg",
    title: "Espirales",
  },
  {
    img: "https://www.cocinacaserayfacil.net/wp-content/uploads/2020/03/Platos-de-comida-que-pides-a-domicilio-y-puedes-hacer-en-casa.jpg",
    title: "Pizza",
  },
  {
    img: "https://www.upmenu.com/wp-content/uploads/2022/08/comida-rapida-a-domicilo-1200x900.jpg",
    title: "Sandwich",
  },
  {
    img: "https://www.clara.es/medio/2021/12/16/que-comer-hoy-ideas_21beeb02_1200x630.jpg",
    title: "Espirales",
  },
  {
    img: "https://www.cocinacaserayfacil.net/wp-content/uploads/2020/03/Platos-de-comida-que-pides-a-domicilio-y-puedes-hacer-en-casa.jpg",
    title: "Pizza",
  },
  {
    img: "https://www.upmenu.com/wp-content/uploads/2022/08/comida-rapida-a-domicilo-1200x900.jpg",
    title: "Sandwich",
  },
  {
    img: "https://www.clara.es/medio/2021/12/16/que-comer-hoy-ideas_21beeb02_1200x630.jpg",
    title: "Espirales",
  },
  {
    img: "https://www.cocinacaserayfacil.net/wp-content/uploads/2020/03/Platos-de-comida-que-pides-a-domicilio-y-puedes-hacer-en-casa.jpg",
    title: "Pizza",
  },
];

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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className="userProfile__recipesTab-panel"
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const UserProfile = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="userProfile">
        <div className="userProfile__backBtn">
          <ArrowBackIcon className="userProfile__backBtn-icon" />
        </div>
        <div className="userProfile__editBtn">
          <EditIcon className="userProfile__editBtn-icon" />
        </div>
        <div className="userProfile__container">
          <div className="userProfile__container-grid">
            <div className="userProfile__container-grid-left">
              <Avatar
                className="userProfile__container-grid-left-image"
                alt="Juan Perez"
                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
              />
              <h3 className="userProfile__container-grid-left-name">
                Juan Perez
              </h3>
            </div>
            <div className="userProfile__container-grid-right">
              <h2 className="userProfile__container-grid-right-label">
                Recetas Compartidas
              </h2>
              <h2 className="userProfile__container-grid-right-counter">
                {userRecipes.length}
              </h2>
            </div>
          </div>
          <p className="userProfile__container-userDescription">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Id nibh
            tortor id aliquet. Accumsan sit amet nulla facilisi morbi tempus.
            Velit scelerisque in dictum non consectetur a erat.
          </p>
          <div className="userProfile__container-contact">
            <CallIcon className="userProfile__container-contact-icon" />
            <p className="userProfile__container-contact-phone">999 999 999</p>
          </div>
        </div>
        <div className="userProfile__recipesTab">
          <div className="userProfile__recipesTab-tabs">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                className="userProfile__recipesTab-tabs-recipes"
                label="Publicaciones"
                {...a11yProps(0)}
              />
              <Tab
                className="userProfile__recipesTab-tabs-favorites"
                label="Favoritos"
                {...a11yProps(1)}
              />
            </Tabs>
          </div>
          <CustomTabPanel value={value} index={0}>
            <div className="userProfile__recipesTab-recipes">
              <ImageList gap={15} cols={5}>
                {userRecipes.map((item) => (
                  <ImageListItem key={item.img}>
                    ,{" "}
                    <img
                      className="userProfile__recipesTab-recipes-img"
                      src={item.img}
                      alt={item.title}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </div>
          </CustomTabPanel>
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
        </div>
      </div>
    </>
  );
};
