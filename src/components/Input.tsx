import { FC } from "react";
import { Grid, TextField } from "@mui/material";

interface Props {
  placeholder?: string;
  onChange: (value: string) => void;
  value?: string;
}

export const Input: FC<Props> = ({ placeholder, onChange, value }) => {
  return (
    <Grid container alignItems="center" columnGap={1}>
      <Grid item xs borderRadius={5} bgcolor="white">
        <TextField
          id="input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          fullWidth
          placeholder={placeholder}
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: 4,
            },
          }}
        />
      </Grid>
    </Grid>
  );
};
