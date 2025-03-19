import { useTranslation } from "react-i18next";
import { Box, CircularProgress } from "@mui/material";
import { AddTrueFalseButton } from "../Buttons/AddTrueFalseButton.tsx";
import SearchOffIcon from "@mui/icons-material/SearchOff";

export interface EmptyResultProps {
  isProcessing?: boolean;
  addHandler?: () => void;
}

export const EmptyResult = (props: EmptyResultProps) => {
  const { t } = useTranslation();

  const buttonOrProgress =
    props.addHandler === undefined ? (
      <></>
    ) : props.isProcessing ? (
      <Box mt={2} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    ) : (
      <Box
        display="flex"
        justifyContent="center"
        ml={"auto"}
        mr={"auto"}
        mt={2}
        sx={{ width: 1 / 2 }}
      >
        <AddTrueFalseButton addHandler={props.addHandler}>
          {t("AddClaimButton")}
        </AddTrueFalseButton>
      </Box>
    );

  return (
    <Box mt={12}>
      <Box display="flex" justifyContent="center">
        <SearchOffIcon fontSize={"large"} />
      </Box>

      <Box mt={2}>
        <Box display="flex" justifyContent="center">
          {t("EmptyResultMessage1")}
        </Box>
        {props.addHandler ? (
          <Box display="flex" justifyContent="center">
            {t("EmptyResultMessage2")}
          </Box>
        ) : (
          <Box display="flex" justifyContent="center">
            {t("EmptyResultMessage3")}
          </Box>
        )}
      </Box>
      {buttonOrProgress}
    </Box>
  );
};
