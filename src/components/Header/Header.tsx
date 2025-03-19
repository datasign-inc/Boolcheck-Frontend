import { Box } from "@mui/material";
import { ReactNode } from "react";

export const Header = (props: { children: ReactNode; bgColor?: string }) => {
  return (
    <Box
      bgcolor={props.bgColor !== undefined ? props.bgColor : "#F9F9F9"}
      sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
    >
      {props.children}
    </Box>
  );
};
