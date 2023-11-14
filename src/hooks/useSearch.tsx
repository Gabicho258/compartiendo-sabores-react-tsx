import { useState } from "react";

interface useSearchParams {
  data: Recipe[];
}

interface Recipe {
  _id: string;
  user_id: string;
  title: string;
  ingredients: string[];
  procedure: string[];
  images: string[];
  category: string;
  average_rating: number;
  views: number;
  __v: number;
}

export const useSearch = ({ data }: useSearchParams) => {
  const [text, setText] = useState("");

  const onChangeInput = (value: string) => {
    setText(value);
  };

  const result =
    text.toLocaleLowerCase().trim().length >= 2
      ? data.filter((recipe) =>
          recipe.title
            .toLocaleLowerCase()
            .trim()
            .includes(text.toLocaleLowerCase().trim())
        )
      : data;

  return { text, onChangeInput, result };
};
