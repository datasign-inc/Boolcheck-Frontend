import { Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTranslation } from "react-i18next";

export interface VoteTrueProps {
  isClicked: boolean;
  buttonHandler: (index: number) => void;
}

export const VoteTrueButton = (props: VoteTrueProps) => {
  const { t } = useTranslation();
  return (
    <Button
      sx={{ width: 1 / 3, m: 0.1 }}
      size={"small"}
      startIcon={
        !props.isClicked ? <CheckCircleIcon color={"success"} /> : <></>
      }
      variant={props.isClicked ? "contained" : "outlined"}
      color={"success"}
      onClick={() => {
        props.buttonHandler(0);
      }}
    >
      {t("True")}
    </Button>
  );
};
