import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";

export const AnonymousClaimer = () => {
  const { t } = useTranslation();
  return (
    <Box
      bgcolor="#F5F5F5"
      pr={2}
      pl={2}
      pt={0.5}
      pb={0.5}
      sx={{ borderRadius: "8px" }}
      mt={1}
    >
      <Typography variant="caption">{t("AnonymousClaimer")}</Typography>
    </Box>
  );
};
