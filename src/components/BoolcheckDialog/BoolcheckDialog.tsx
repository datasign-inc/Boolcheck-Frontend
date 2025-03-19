import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export interface DialogProps {
  title: string;
  message: string;
  okAction: () => void;
  cancelAction?: () => void;
}

export const BoolcheckDialog = (props: DialogProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Dialog
        open={true}
        onClose={props.cancelAction}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {props.cancelAction && (
            <Button onClick={props.cancelAction}>{t("Cancel")}</Button>
          )}
          <Button onClick={props.okAction} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
