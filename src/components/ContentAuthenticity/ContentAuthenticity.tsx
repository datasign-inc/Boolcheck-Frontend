import { Box, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Authenticity } from "../../api/types.ts";

export interface ContentAuthenticityProps {
  authenticity: Authenticity;
}

// red: "#fcebeb"
// grey: "#ebebeb"

export const ContentAuthenticity = (props: ContentAuthenticityProps) => {
  const { t } = useTranslation();
  const bgColor =
    props.authenticity === 1
      ? "#ebfcef"
      : props.authenticity === -1
      ? "#fcebeb"
      : "#ebebeb";
  const color =
    props.authenticity === 1
      ? "success"
      : props.authenticity === -1
      ? "error"
      : "disabled";
  const text =
    props.authenticity === 1
      ? t("True")
      : props.authenticity === -1
      ? t("False")
      : t("Indeterminate");
  return (
    <Box
      borderRadius={2}
      p={0.4}
      pl={0}
      mt={1}
      sx={{ backgroundColor: bgColor }}
      width={props.authenticity === 0 ? 190 : 150}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Stack alignItems="center" direction="row">
        <Typography fontSize={12}>{t("ThisContentIs")}</Typography>
        <Typography color={color} fontSize={12} fontWeight={"bold"}>
          {text}
        </Typography>
        <Typography fontSize={12}>{t("JapanesePeriod")}</Typography>
      </Stack>
    </Box>
  );
};
