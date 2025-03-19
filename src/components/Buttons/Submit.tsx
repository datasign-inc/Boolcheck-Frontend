import { Button, styled } from "@mui/material";

export const SubmitButton = styled((props) => <Button {...props} />)(() => ({
  "&.MuiButton-root": {
    width: "100%",
    borderRadius: "16px",
    color: "white",
    backgroundColor: "#000000", //todo: dark mode light mode の際にthemeを参照して決定する必要がある?
  },
})) as typeof Button;
