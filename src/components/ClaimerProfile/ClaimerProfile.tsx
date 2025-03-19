import { Box, Link, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export interface ClaimerProfileProps {
  attributes: string[];
  name: string;
  onClick?: () => void;
}

export const subPrefix = "urn:ietf:params:oauth:jwk-thumbprint:sha-256:";

export const ClaimerProfile = (props: ClaimerProfileProps) => {
  const { t } = useTranslation();
  return (
    <Box sx={{ mt: 0.2 }}>
      <Typography variant="body2" color="textSecondary">
        {props.attributes.map((value) => {
          return value;
        })}
      </Typography>
      <Typography
        variant="subtitle1"
        color="textPrimary"
        sx={{ wordBreak: "break-all" }}
      >
        {props.name.replace(subPrefix, "")}
      </Typography>
      {props.onClick != undefined && (
        <Link
          color={"textSecondary"}
          component="button"
          onClick={props.onClick}
        >
          <Typography
            variant="subtitle1"
            color="textSecondary"
            fontSize="small"
          >
            {t("CheckClaimerAttribute")}
          </Typography>
        </Link>
      )}
    </Box>
  );
};
