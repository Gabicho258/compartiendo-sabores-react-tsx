import React from "react";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddIcon from "@mui/icons-material/Add";
import { Box, FormControl } from "@mui/material";
import { NavBar } from "../../components/NavBar/NavBar";
import { RatingStars } from "../../components/Rating/RatingStars";
import { Comment } from "../../components/Comment/Comment";
import "./_Recipe.scss";
import { Comment as CommentInterface } from "../../interfaces";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateCommentMutation,
  useGetCommentsByRecipeIdQuery,
  useGetRecipeByIdQuery,
  useGetUserByIdQuery,
  useGetUsersQuery,
  useUpdateRecipeMutation,
  useUpdateUserMutation,
} from "../../app/apis/compartiendoSabores.api";

// const recipe = recetas[0];

export const Recipe = () => {
  const [addingComment, setAddingComment] = useState(false);
  const navigate = useNavigate();
  const isUserAuthenticated = localStorage.getItem("data");
  const userCredentials =
    isUserAuthenticated && JSON.parse(isUserAuthenticated);
  const { id } = useParams();
  const { data: recipe } = useGetRecipeByIdQuery(id || "");
  const { data: user } = useGetUserByIdQuery(userCredentials.id);
  const { data: users } = useGetUsersQuery();
  const [updateUser, { isLoading: isLoadingUser }] = useUpdateUserMutation();
  const [createComment, { isLoading }] = useCreateCommentMutation();
  const [updateRecipe] = useUpdateRecipeMutation();
  const { data: comments, refetch: refetchComment } =
    useGetCommentsByRecipeIdQuery(id || "");
  const [form, setForm] = useState<Partial<CommentInterface>>({
    rating: 0,
    comment: "",
  });

  const ratingChange = (value: number) => {
    setForm({
      ...form,
      rating: value,
    });
  };

  const handleSubmit = async () => {
    const comment = { ...form, user_id: userCredentials.id, recipe_id: id };
    try {
      await createComment(comment).unwrap();
      // actualizamos la calificación de la receta
      if (comments?.length === 0) {
        await updateRecipe({
          _id: id,
          average_rating: comment.rating,
        }).unwrap();
      } else {
        await updateRecipe({
          _id: id,
          average_rating:
            ((comment.rating || 0) + (recipe?.average_rating || 0)) / 2,
        }).unwrap();
      }

      // refetchComment
      setAddingComment(false);
      refetchComment();
    } catch (error: any) {
      alert(JSON.stringify(error.data));
    }
  };
  const handleFavorite = async () => {
    const isFavorite = user?.favorites.includes(id || "");
    try {
      if (isFavorite) {
        // si es favorito, lo quitamos
        await updateUser({
          _id: userCredentials.id,
          favorites: user?.favorites.filter(
            (favorite) => favorite !== recipe?._id
          ),
        }).unwrap();
      } else {
        // sino lo agregamos
        await updateUser({
          _id: userCredentials.id,
          favorites: [...(user?.favorites || []), recipe?._id || ""],
        }).unwrap();
      }
    } catch (error: any) {
      alert(JSON.stringify(error.data));
    }
    // console.log(isFavorite);
  };
  return (
    <>
      <NavBar />
      <div className="recipe">
        <div className="recipe__backBtn">
          <ArrowBackIcon
            className="recipe__backBtn-icon"
            onClick={() => navigate(-1)}
          />
        </div>
        <div className="recipe__container">
          <Button
            className="recipe__container-favBtn"
            variant="contained"
            onClick={handleFavorite}
            disabled={isLoadingUser}
          >
            {user?.favorites.includes(id || "") ? (
              <>
                Favorito{" "}
                <FavoriteIcon className="recipe__container-favBtn-icon" />
              </>
            ) : (
              <>
                Marcar como favorito{" "}
                <FavoriteBorderIcon className="recipe__container-favBtn-icon" />
              </>
            )}
          </Button>
          <div className="recipe__container-header">
            <h1 className="recipe__container-header-title">{recipe?.title}</h1>
            <div className="recipe__container-header-rating">
              <RatingStars
                readOnly
                qualification={recipe?.average_rating || 0}
              />
            </div>
          </div>

          <div className="recipe__container-grid">
            <div className="recipe__container-grid-left">
              <div className="recipe__container-grid-left-author">
                <div className="recipe__container-grid-left-label">
                  Por:{" "}
                  {
                    users?.find((user) => user._id === recipe?.user_id)
                      ?.first_name
                  }{" "}
                  {
                    users?.find((user) => user._id === recipe?.user_id)
                      ?.last_name
                  }
                </div>
              </div>
              <div className="recipe__container-grid-left-ingredients">
                <div className="recipe__container-grid-left-label">
                  Ingredientes
                </div>
                <ul className="recipe__container-grid-left-list">
                  {recipe?.ingredients.map((ingredient, index) => {
                    return <li key={index}>{ingredient}</li>;
                  })}
                </ul>
              </div>
            </div>
            <div className="recipe__container-grid-right">
              <img
                className="recipe__container-grid-right-img"
                src={recipe?.images[0]}
                alt="recipeImg-1"
              />
              <img
                className="recipe__container-grid-right-img"
                src={recipe?.images[1]}
                alt="recipeImg-2"
              />
            </div>
          </div>
          <div className="recipe__container-procedure">
            <div className="recipe__container-procedure-label">
              Procedimiento
            </div>
            <ol className="recipe__container-procedure-list">
              {recipe?.procedure.map((step, index) => {
                return <li key={index}>{step}</li>;
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
              onClick={() => {
                setAddingComment(true);
              }}
              disabled={comments?.some(
                (comment) => comment.user_id === userCredentials.id
              )}
            >
              <AddIcon className="recipe__comments-header-addCommentBtn-icon" />
              Añadir comentario
            </Button>
          </div>
          {addingComment && (
            <FormControl className="recipe__comments-newComment">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // handleSubmit(e);
                }}
              >
                <Box className="recipe__comments-newComment-container">
                  <div className="recipe__comments-newComment-container-rating">
                    <h3 className="recipe__comments-newComment-container-rating-label">
                      Calificación:
                    </h3>
                    <RatingStars
                      qualification={0}
                      readOnly={false}
                      darkTheme
                      onChangeRating={ratingChange}
                    />
                  </div>
                  <textarea
                    className="recipe__comments-newComment-container-comment"
                    required
                    placeholder="Escribe un comentario..."
                    rows={4}
                    value={form.comment}
                    onChange={({ target }) => {
                      setForm({
                        ...form,
                        comment: target.value,
                      });
                    }}
                  ></textarea>
                  <div className="recipe__comments-newComment-container-btnSection">
                    <Button
                      type="submit"
                      color="success"
                      variant="contained"
                      className="recipe__comments-newComment-container-btnSection-submit"
                      onClick={handleSubmit}
                      disabled={form.comment?.length === 0 || isLoading}
                    >
                      Guardar cambios
                    </Button>
                    <Button
                      type="button"
                      variant="contained"
                      className="recipe__comments-newComment-container-btnSection-cancel"
                      disabled={isLoading}
                      onClick={() => {
                        setAddingComment(false);
                        form.comment = "";
                      }}
                    >
                      Cancelar
                    </Button>
                  </div>
                </Box>
              </form>
            </FormControl>
          )}
          <div className="recipe__comments-comments-section">
            {comments?.map((comment, index) => {
              const [user] =
                users?.filter((user) => user._id === comment.user_id) || [];
              return (
                <Comment
                  key={index}
                  author={`${user?.first_name} ${user?.last_name}`}
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
