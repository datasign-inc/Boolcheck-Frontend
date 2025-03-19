import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import CloudOffIcon from "@mui/icons-material/CloudOff";

export const ConnectionFailed = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Box display="flex" justifyContent="center">
        <CloudOffIcon />
      </Box>
      <Box mt={2} display="flex" justifyContent="center">
        {t("FailedToLoadData")}
      </Box>
    </Box>
  );
};
