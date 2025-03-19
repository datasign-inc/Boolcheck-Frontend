import { useTranslation } from "react-i18next";
import { TextField } from "@mui/material";

export interface CommentInputProps {
  value: string;
  onChangeHandler: (newText: string) => void;
}

export const CommentInputField = (props: CommentInputProps) => {
  const { t } = useTranslation();
  return (
    <TextField
      fullWidth
      multiline
      minRows={13}
      value={props.value}
      placeholder={t("InputComment")}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChangeHandler(e.target.value);
      }}
    />
  );
};
