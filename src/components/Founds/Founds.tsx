import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";

export interface FoundsProps {
  count: number;
}

export const Founds = (props: FoundsProps) => {
  const { t } = useTranslation();
  if (0 < props.count) {
    return (
      <Box>
        {props.count} {t("NumberOfCount")} {t("Founds")}
      </Box>
    );
  }
  return <Box>0{t("NumberOfCount")}</Box>;
};
