import { Grid, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { RatingStars } from "../Rating/RatingStars";
import "./_RecipeCard.scss";
import { useGetUserByIdQuery } from "../../app/apis/compartiendoSabores.api";
import { useNavigate } from "react-router-dom";

interface RecipeCardProps {
  title: string;
  user_id: string;
  images: string[];
  views: number;
  _id: string;
  average_rating: number;
}

export const RecipeCard = ({
  title,
  user_id,
  views,
  average_rating,
  images,
  _id,
}: RecipeCardProps) => {
  const imageURL = images[0];
  const { data } = useGetUserByIdQuery(user_id);
  const navigate = useNavigate();
  return (
    <Grid
      container
      spacing={2}
      className="recipeCard__container"
      onClick={() => {
        navigate(`/recipe/${_id}`);
      }}
    >
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
              {data?.first_name} {data?.last_name}
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
