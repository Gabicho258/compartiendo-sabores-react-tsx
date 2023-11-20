import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import { NavBar } from "../../components/NavBar/NavBar";
import { RatingStars } from "../../components/Rating/RatingStars";
import { Comment } from "../../components/Comment/Comment";
import "./_Recipe.scss";
import { recetas } from "../../static_test/recipes";
import { comments } from "../../static_test/comments";

const recipe = recetas[0];

export const Recipe = () => {
  return (
    <>
      <NavBar />
      <div className="recipe">
        <div className="recipe__backBtn">
          <ArrowBackIcon className="recipe__backBtn-icon" />
        </div>
        <div className="recipe__container">
          <Button className="recipe__container-favBtn" variant="contained">
            Marcar como favorito
            <FavoriteIcon className="recipe__container-favBtn-icon" />
          </Button>
          <div className="recipe__container-header">
            <h1 className="recipe__container-header-title">{recipe.title}</h1>
            <div className="recipe__container-header-rating">
              <RatingStars readOnly qualification={recipe.average_rating} />
            </div>
          </div>

          <div className="recipe__container-grid">
            <div className="recipe__container-grid-left">
              <div className="recipe__container-grid-left-author">
                <div className="recipe__container-grid-left-label">
                  Por: {recipe.user_id}
                </div>
              </div>
              <div className="recipe__container-grid-left-ingredients">
                <div className="recipe__container-grid-left-label">
                  Ingredientes
                </div>
                <ul className="recipe__container-grid-left-list">
                  {recipe.ingredients.map((ingredient) => {
                    return <li>{ingredient}</li>;
                  })}
                </ul>
              </div>
            </div>
            <div className="recipe__container-grid-right">
              <img
                className="recipe__container-grid-right-img"
                src={recipe.images[0]}
                alt="recipeImg-1"
              />
              <img
                className="recipe__container-grid-right-img"
                src={recipe.images[1]}
                alt="recipeImg-2"
              />
            </div>
          </div>
          <div className="recipe__container-procedure">
            <div className="recipe__container-procedure-label">
              Procedimiento
            </div>
            <ol className="recipe__container-procedure-list">
              {recipe.procedure.map((step) => {
                return <li>{step}</li>;
              })}
            </ol>
          </div>
        </div>
        <div className="recipe__comments">
          <div className="recipe__comments-header">
            <h4 className="recipe__comments-header-title">Comentarios</h4>
            <Button
              className="recipe__comments-header-addCommentBtn"
              variant="contained"
            >
              <AddIcon className="recipe__comments-header-addCommentBtn-icon" />
              Añadir comentario
            </Button>
          </div>
          <div className="recipe__comments-comments-section">
            {comments.map((comment) => {
              return (
                <Comment
                  author={comment.author}
                  comment={comment.comment}
                  rating={comment.rating}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};