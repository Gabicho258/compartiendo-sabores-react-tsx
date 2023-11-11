import { useState } from "react";
import { Rating } from "@mui/material";

interface RatingProps {
  readOnly: boolean;
  qualification: number;
}

export const RatingStars = ({ readOnly, qualification }: RatingProps) => {
  const [value, setValue] = useState<number | null>(2);
  return (
    <div>
      {readOnly ? (
        <Rating name="read-only" value={qualification} readOnly />
      ) : (
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      )}
    </div>
  );
};
