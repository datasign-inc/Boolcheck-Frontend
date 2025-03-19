import { Button, styled } from "@mui/material";
import { ReactNode } from "react";

const SearchButton_ = styled((props) => <Button {...props} />)(() => ({
  height: "56px",
  width: "24%",
  borderRadius: "8px",
  backgroundColor: "#000000",
})) as typeof Button;

export interface SearchButtonProps {
  children: ReactNode;
  searchHandler: () => void;
}

export const SearchButton = (props: SearchButtonProps) => {
  return (
    <SearchButton_
      size={"large"}
      variant="contained"
      onClick={props.searchHandler}
    >
      {props.children}
    </SearchButton_>
  );
};
