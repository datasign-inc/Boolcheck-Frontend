import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export interface NoteOnOpenWalletProps {
  appStoreUrl: string;
}

export const NoteOnOpenWallet = (props: NoteOnOpenWalletProps) => {
  const { t } = useTranslation();
  return (
    <Box mt={2}>
      <Box display="flex" justifyContent="center">
        <Typography fontSize={12}>{t("WillOpenDiw")}</Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        <Typography fontSize={12}>{t("InstallDiw")}</Typography>
      </Box>
      <Box mt={2} display="flex" justifyContent="center">
        <a href={props.appStoreUrl}>
          <img src={"/images/AppStore.svg"} />
        </a>
      </Box>
    </Box>
  );
};
