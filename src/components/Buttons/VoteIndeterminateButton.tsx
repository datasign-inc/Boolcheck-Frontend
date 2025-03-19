import { useTranslation } from "react-i18next";
import { Button, styled } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";

const VoteIndeterminateButton_ = styled((props) => <Button {...props} />)(
  () => ({
    "&.MuiButton-root": {
      color: "grey",
      borderColor: "grey",
    },
    "&.MuiButton-contained": {
      color: "white",
      backgroundColor: "grey",
    },
  })
) as typeof Button;

export interface VoteIndeterminateProps {
  isClicked: boolean;
  buttonHandler: (index: number) => void;
}

export const VoteIndeterminateButton = (props: VoteIndeterminateProps) => {
  const { t } = useTranslation();
  return (
    <VoteIndeterminateButton_
      size={"small"}
      startIcon={!props.isClicked ? <HelpIcon /> : <></>}
      variant={props.isClicked ? "contained" : "outlined"}
      sx={{ width: 1 / 3, m: 0.1 }}
      onClick={() => {
        props.buttonHandler(2);
      }}
    >
      {t("Indeterminate")}
    </VoteIndeterminateButton_>
  );
};
