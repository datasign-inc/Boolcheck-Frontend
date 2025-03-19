import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";
import { IssuerInfo } from "../../vc/verify.ts";

export interface IdentityCertificationAuthorityProps extends IssuerInfo {
  authorityIcon?: string;
}

export const IdentityCertificationAuthority = (
  props: IdentityCertificationAuthorityProps
) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography variant="h6">{t("CertificationAuthority")}</Typography>
      <Box mt={2}>
        <Typography>{props.issuerName}</Typography>
        <Typography variant="body2" color="textSecondary">
          Verified by {props.issuerAuthenticator}
        </Typography>
      </Box>
      <Box mt={4}>
        <Typography variant="body2" color="textSecondary">
          {t("Address")}
        </Typography>
        <Typography variant="subtitle1" color="textPrimary">
          {`${props.issuerState} ${props.issuerLocality}`}
        </Typography>
      </Box>
      <Box mt={2}>
        <Typography variant="body2" color="textSecondary">
          {t("CountryName")}
        </Typography>
        <Typography variant="subtitle1" color="textPrimary">
          {props.issuerNationality}
        </Typography>
      </Box>
      <Box mt={2}>
        <Typography variant="body2" color="textSecondary">
          URL
        </Typography>
        <Typography variant="subtitle1" color="textPrimary">
          {props.issuerUrl}
        </Typography>
      </Box>
    </Box>
  );
};
