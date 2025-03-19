import { Button, styled } from "@mui/material";
import { ReactNode } from "react";

const AddTrueFalseButton_ = styled((props) => <Button {...props} />)(() => ({
  "&.MuiButton-root": {
    borderRadius: "16px",
    backgroundColor: "#000000", //todo: dark mode light mode の際にthemeを参照して決定する必要がある?
  },
})) as typeof Button;

export interface AddTrueFalseButtonProps {
  children: ReactNode;
  addHandler: () => void;
}

export const AddTrueFalseButton = (props: AddTrueFalseButtonProps) => {
  return (
    <AddTrueFalseButton_
      fullWidth
      size={"medium"}
      variant="contained"
      onClick={props.addHandler}
    >
      {props.children}
    </AddTrueFalseButton_>
  );
};
