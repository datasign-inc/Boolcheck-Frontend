import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { ArrowBack, Close } from "@mui/icons-material";

export interface AppBarProps {
  text: string;
  align?: "center" | "inherit" | "justify" | "left" | "right";
  backHandler?: () => void;
  closeHandler?: () => void;
}

export const BoolCheckAppBar = (props: AppBarProps) => {
  return (
    <AppBar position="static" color={"transparent"} elevation={0}>
      <Toolbar variant={"dense"}>
        {props.backHandler !== undefined && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={props.backHandler}
          >
            <ArrowBack />
          </IconButton>
        )}

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          align={props.align !== undefined ? props.align : "left"}
        >
          {props.text}
        </Typography>
        {props.closeHandler !== undefined && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={props.closeHandler}
          >
            <Close />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};
