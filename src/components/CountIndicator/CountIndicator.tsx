import { useTranslation } from "react-i18next";
import { Box, Stack, Typography } from "@mui/material";

export interface CountIndicatorProps {
  hideAnonymousCount: boolean;
  trueCount: number;
  falseCount: number;
  indeterminateCount: number;
  anonymousTrueCount: number;
  anonymousFalseCount: number;
  anonymousIndeterminateCount: number;
}

export const CountIndicator = (props: CountIndicatorProps) => {
  const { t } = useTranslation();
  return (
    <Box>
      <Stack spacing={1} direction={"row"}>
        <Typography color={"success"} sx={{ fontWeight: "bolder" }}>
          {t("True")}
        </Typography>
        <Typography component={"span"}>: {props.trueCount}</Typography>

        <Typography color={"error"} sx={{ fontWeight: "bolder" }}>
          {t("False")}
        </Typography>
        <Typography component={"span"}>: {props.falseCount}</Typography>

        <Typography variant={"subtitle2"} sx={{ fontWeight: "light" }} pt={0.2}>
          {t("Indeterminate")}
        </Typography>
        <Typography component={"span"}>: {props.indeterminateCount}</Typography>
      </Stack>
      {!props.hideAnonymousCount && (
        <Box mt={1}>
          <Typography variant={"subtitle2"} sx={{ fontWeight: "light" }}>
            {t("ReportedByUnverifiedUser")}
          </Typography>

          <Stack spacing={1} direction={"row"}>
            <Typography>{t("True")}</Typography>
            <Typography component={"span"}>
              : {props.anonymousTrueCount}
            </Typography>

            <Typography>{t("False")}</Typography>
            <Typography component={"span"}>
              : {props.anonymousFalseCount}
            </Typography>

            <Typography
              variant={"subtitle2"}
              sx={{ fontWeight: "light" }}
              pt={0.2}
            >
              {t("Indeterminate")}
            </Typography>
            <Typography component={"span"}>
              : {props.anonymousIndeterminateCount}
            </Typography>
          </Stack>
        </Box>
      )}
    </Box>
  );
};
