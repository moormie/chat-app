import { FC } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

export interface Props {
  open?: boolean;
}

export const LoadingIndicator: FC<Props> = ({ open = false }) => {
  return (
    <Backdrop sx={{ zIndex: 5000, color: "#fff" }} open>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
