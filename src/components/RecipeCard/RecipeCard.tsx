import { Grid, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { RatingStars } from "../Rating/RatingStars";
import "./_RecipeCard.scss";

export const RecipeCard = () => {
  return (
    <Grid container spacing={2} className="recipeCard__container">
      <Grid item className="recipeCard__container-imageContainer">
        <img
          alt="NameImage"
          src="https://www.recetasnestlecam.com/sites/default/files/styles/crop_article_banner_desktop_nes/public/2023-02/postres-con-mango.jpg.jpg?itok=c6AgNlbK"
        />
      </Grid>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={1}>
          <Grid item xs className="recipeCard__container-info">
            <Typography gutterBottom variant="subtitle1" component="div">
              Nombre elemento
            </Typography>
            <Typography variant="body2" gutterBottom>
              Publicador
            </Typography>
          </Grid>
          <Grid item className="recipeCard__container-footer">
            <Typography variant="body2">
              <span>10</span>
              <VisibilityIcon />
            </Typography>
            {/* <Typography variant="body2">5 Estrellas</Typography> */}
            <RatingStars readOnly={true} qualification={2} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
