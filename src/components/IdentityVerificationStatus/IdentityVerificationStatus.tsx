import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import { VerifyResult } from "../../vc/verify.ts";

export interface IdentityVerificationStatusProps {
  status: VerifyResult;
}

export const IdentityVerificationStatus = (
  props: IdentityVerificationStatusProps
) => {
  const { t } = useTranslation();
  return (
    <Box
      bgcolor={props.status === "valid" ? "#cfe7fc" : "#F5F5F5"}
      borderRadius="6px"
      ml={1}
      mr={1}
      pl={3}
      pr={3}
      pt={1}
      pb={1}
    >
      {props.status === "valid" ? t("VerifiedClaimer") : t("ExpiredClaimer")}
    </Box>
  );
};
