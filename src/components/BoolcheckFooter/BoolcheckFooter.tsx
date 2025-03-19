import { Box, Typography, useMediaQuery } from "@mui/material";
import {
  boolcheckCertificateIssuancePolicy,
  boolcheckPrivacyPolicy,
  boolcheckTermsOfService,
  mediaQuery,
} from "../../config.ts";
import { useTranslation } from "react-i18next";

export const BoolcheckFooter = () => {
  const { t } = useTranslation();
  const isLargeScreen = useMediaQuery(mediaQuery);
  const links: [string, string][] = [
    [t("PrivacyPolicy"), boolcheckPrivacyPolicy],
    [t("TermsOfService"), boolcheckTermsOfService],
    [t("CertificateIssuancePrivacyPolicy"), boolcheckCertificateIssuancePolicy],
  ];
  return (
    <Box
      bgcolor={"#3B3B3B"}
      sx={{
        width: "100%",
        height: "24px",
        color: "#FFFFFF",
        display: "flex", // 横並びにする
        justifyContent: "center", // 中央揃え
        alignItems: "center", // 縦方向中央揃え
        gap: isLargeScreen ? "16px" : "8px",
      }}
    >
      {links.map((labelWithlink) => {
        const [label, link] = labelWithlink;
        return (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "#FFFFFF",
                fontSize: isLargeScreen ? "11px" : "9px",
              }}
            >
              {label}
            </Typography>
          </a>
        );
      })}
    </Box>
  );
};
