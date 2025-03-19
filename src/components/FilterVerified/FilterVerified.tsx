import { Box, FormControlLabel, Typography } from "@mui/material";
import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { IOSSwitch } from "../iOSSwitch/iOSSwitch.tsx";

export interface FilterVerifiedProps {
  checked: boolean;
  countMessage: string;
  onChangeHandler: (newValue: boolean) => void;
}

export const FilterVerified = (props: FilterVerifiedProps) => {
  const { t } = useTranslation();
  return (
    <FormControlLabel
      control={
        <IOSSwitch
          color={"primary"}
          checked={props.checked}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            props.onChangeHandler(event.target.checked);
          }}
        />
      }
      labelPlacement={"end"}
      label={
        <Box display="flex">
          <Box ml={1.5}>
            <Typography>{t("OnlyVerified")}</Typography>
          </Box>
          <Box ml={2}>
            <Typography>{props.countMessage}</Typography>
          </Box>
        </Box>
      }
    />
  );
};
