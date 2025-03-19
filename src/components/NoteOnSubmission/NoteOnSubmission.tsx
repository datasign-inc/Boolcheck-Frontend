import { useTranslation } from "react-i18next";
import { List, ListItem, Typography } from "@mui/material";

export const NoteOnSubmission = () => {
  const { t } = useTranslation();
  return (
    <List>
      <ListItem>
        <Typography fontSize={11}>{t("DiwIsRequired")}</Typography>
      </ListItem>
      <ListItem>
        <Typography fontSize={11}>{t("DeletionPolicy")}</Typography>
      </ListItem>
    </List>
  );
};
