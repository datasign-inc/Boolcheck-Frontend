import { useTranslation } from "react-i18next";
import { Button, styled } from "@mui/material";
import { useState } from "react";

export const ShowAllIdentityButton = styled((props) => <Button {...props} />)(
  () => ({
    "&.MuiButton-root": {
      width: "55%",
      borderColor: "#000000",
      borderRadius: "16px",
      borderWidth: "1px",
      color: "black",
      backgroundColor: "#FFFFFF", //todo: dark mode light mode の際にthemeを参照して決定する必要がある?
    },
  })
) as typeof Button;

export interface ShowAllIdentityInfoProps {
  clickHandler: () => void;
}

export const ShowAllIdentityInfo = (props: ShowAllIdentityInfoProps) => {
  const { t } = useTranslation();
  const [flag, setFlag] = useState<boolean>(true);
  return (
    <ShowAllIdentityButton
      variant="outlined"
      onClick={() => {
        props.clickHandler();
        setFlag((prev) => !prev);
      }}
    >
      {flag ? t("ShowAllIdentityInfo") : t("HideAllIdentityInfo")}
    </ShowAllIdentityButton>
  );
};
