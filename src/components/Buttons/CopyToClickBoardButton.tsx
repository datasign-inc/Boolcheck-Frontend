import { Button, styled } from "@mui/material";

export const CopyToClipBoardButton = styled((props) => <Button {...props} />)(
  () => ({
    "&.MuiButton-root": {
      borderRadius: "6px",
      backgroundColor: "#CC9966", //todo: dark mode light mode の際にthemeを参照して決定する必要がある?
    },
  })
) as typeof Button;
