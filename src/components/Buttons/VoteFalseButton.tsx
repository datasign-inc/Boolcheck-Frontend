import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

export interface VoteFalseProps {
  isClicked: boolean;
  buttonHandler: (index: number) => void;
}

export const VoteFalseButton = (props: VoteFalseProps) => {
  const { t } = useTranslation();
  return (
    <Button
      sx={{ width: 1 / 3, m: 0.1 }}
      size={"small"}
      startIcon={!props.isClicked ? <CancelIcon color={"error"} /> : <></>}
      variant={props.isClicked ? "contained" : "outlined"}
      color={"error"}
      onClick={() => {
        props.buttonHandler(1);
      }}
    >
      {t("False")}
    </Button>
  );
};
