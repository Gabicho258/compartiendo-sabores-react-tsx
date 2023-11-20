import React from "react";
import { RatingStars } from "../Rating/RatingStars";
import "./_Comment.scss";

interface CommentProps {
  author: string;
  comment: string;
  rating: number;
}

export const Comment = ({ author, comment, rating }: CommentProps) => {
  return (
    <div className="comment">
      <div className="comment__header">
        <h4 className="comment__header-author">{author}</h4>
        <RatingStars readOnly darkTheme qualification={rating} />
      </div>
      <p className="comment__commentContent">{comment}</p>
    </div>
  );
};
