import { useTranslation } from "react-i18next";
import { BoolcheckDialog } from "../BoolcheckDialog/BoolcheckDialog.tsx";

export interface DeleteDialogProps {
  deleteAction: () => void;
  cancelAction: () => void;
}

export const DeleteDialog = (props: DeleteDialogProps) => {
  const { t } = useTranslation();

  return (
    <BoolcheckDialog
      title={t("DeleteDialogTitle")}
      message={t("DeleteDialogMessage")}
      okAction={props.deleteAction}
      cancelAction={props.cancelAction}
    />
  );
};
