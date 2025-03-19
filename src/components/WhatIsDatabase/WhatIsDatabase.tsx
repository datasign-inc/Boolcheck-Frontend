import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

export const WhatIsDatabase = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Box>{t("WhatIsDatabase.Abstract")}</Box>
      <Box mt={2}>
        <Box sx={{ fontWeight: "bold" }}>{t("WhatIsDatabase.Faq.Title1")}</Box>
        <Box>{t("WhatIsDatabase.Faq.Content1")}</Box>
      </Box>

      <Box mt={2}>
        <Box sx={{ fontWeight: "bold" }}>{t("WhatIsDatabase.Faq.Title2")}</Box>
        <Box>{t("WhatIsDatabase.Faq.Content2")}</Box>
      </Box>

      <Box mt={2}>
        <Box sx={{ fontWeight: "bold" }}>{t("WhatIsDatabase.Faq.Title3")}</Box>
        <Box>{t("WhatIsDatabase.Faq.Content3")}</Box>
      </Box>
    </Box>
  );
};
