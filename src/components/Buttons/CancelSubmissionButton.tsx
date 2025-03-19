import { Button, styled } from "@mui/material";
import { ReactNode } from "react";

const CancelSubmissionButton_ = styled((props) => <Button {...props} />)(
  () => ({
    "&.MuiButton-root": {
      color: "#000000", // todo: light darkに応じて、themeを考慮する。
    },
  })
) as typeof Button;

export interface CancelSubmissionButtonProps {
  children: ReactNode;
  cancelHandler: () => void;
}

export const CancelSubmissionButton = (props: CancelSubmissionButtonProps) => {
  return (
    <CancelSubmissionButton_
      fullWidth
      size={"medium"}
      variant={"text"}
      onClick={props.cancelHandler}
    >
      {props.children}
    </CancelSubmissionButton_>
  );
};
