import { useState } from "react";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorder from "@mui/icons-material/StarBorder";

interface RatingProps {
  readOnly: boolean;
  qualification: number;
  onChangeRating?: (value: number) => void;
  darkTheme?: boolean;
}

export const RatingStars = ({
  readOnly,
  qualification,
  darkTheme,
  onChangeRating,
}: RatingProps) => {
  const [value, setValue] = useState<number | null>(qualification);
  return (
    <div>
      {readOnly ? (
        <Rating
          name="read-only"
          value={qualification}
          readOnly
          emptyIcon={
            darkTheme ? (
              <StarIcon
                style={{ opacity: 0.7, color: "#fff" }}
                fontSize="inherit"
              />
            ) : undefined
          }
        />
      ) : (
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            if (onChangeRating && newValue) {
              onChangeRating(newValue);
            }
          }}
          emptyIcon={
            darkTheme ? (
              <StarIcon
                style={{ opacity: 0.7, color: "#fff" }}
                fontSize="inherit"
              />
            ) : undefined
          }
        />
      )}
    </div>
  );
};
