import { Grid, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { RatingStars } from "../Rating/RatingStars";
import "./_RecipeCard.scss";

interface RecipeCardProps {
  title: string;
  user_name: string;
  images: string[];
  views: number;
  average_rating: number;
}

export const RecipeCard = ({
  title,
  user_name,
  views,
  average_rating,
  images,
}: RecipeCardProps) => {
  const imageURL = images[0];

  return (
    <Grid container spacing={2} className="recipeCard__container">
      <Grid item className="recipeCard__container-imageContainer">
        <img alt={title} src={imageURL} />
      </Grid>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={1}>
          <Grid item xs className="recipeCard__container-info">
            <Typography gutterBottom variant="h6" component="div">
              {title}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {user_name}
            </Typography>
          </Grid>
          <Grid item className="recipeCard__container-footer">
            <Typography variant="body2">
              <span>
                <b>{views}</b>
              </span>
              <VisibilityIcon />
            </Typography>
            <RatingStars readOnly={true} qualification={average_rating} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
