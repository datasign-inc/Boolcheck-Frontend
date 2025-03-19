import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";

export const NoteOnDeletion = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Box>{t("DiwIsRequiredForDeletion")}</Box>
      <Box mt={2}>{t("UseWalletToDeletion")}</Box>
    </Box>
  );
};
