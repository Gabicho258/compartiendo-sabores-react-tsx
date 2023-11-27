import React from "react";
import { RatingStars } from "../Rating/RatingStars";
import "./_Comment.scss";
import { useNavigate } from "react-router-dom";

interface CommentProps {
  author: string;
  comment: string;
  rating: number;
  user_id: string;
}

export const Comment = ({ author, comment, rating, user_id }: CommentProps) => {
  const navigate = useNavigate();
  return (
    <div className="comment">
      <div className="comment__header">
        <h4
          className="comment__header-author"
          onClick={() => {
            navigate(`/profile/${user_id}`);
          }}
        >
          {author}
        </h4>
        <RatingStars readOnly darkTheme qualification={rating} />
      </div>
      <p className="comment__commentContent">{comment}</p>
    </div>
  );
};
