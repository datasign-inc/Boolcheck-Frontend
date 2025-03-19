import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

export const NoteOnSign = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Box>{t("DiwIsRequired")}</Box>
      <Box mt={2}>{t("UseWalletToSign")}</Box>
      <Box mt={2}>{t("AddVcAsYouLike")}</Box>
    </Box>
  );
};
