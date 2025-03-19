import { useTranslation } from "react-i18next";
import { Box, InputAdornment, styled, TextField } from "@mui/material";
import { Cancel } from "@mui/icons-material";
import { SearchButton } from "../Buttons/SearchButton.tsx";
import { isValidHttpString } from "../../util/url.ts";
import React from "react";

export interface SearchBarProps {
  onChangeHandler: (newText: string) => void;
  searchHandler: () => void;
  clearHandler: () => void;
  text: string;
}

const StyledTextField = styled((props) => <TextField {...props} />)(() => ({
  marginRight: "1%",
  width: "72%",
})) as typeof TextField;

export const SearchBar = (props: SearchBarProps) => {
  const { t } = useTranslation();

  const adorment =
    props.text !== "" ? (
      <InputAdornment
        position="start"
        onClick={() => {
          props.clearHandler();
        }}
      >
        <Cancel />
      </InputAdornment>
    ) : (
      <></>
    );

  return (
    <Box>
      <StyledTextField
        error={props.text.trim() != "" && !isValidHttpString(props.text)}
        size="medium"
        fullWidth
        id="outlined-helperText"
        value={props.text}
        label={t("SearchBarTitle")}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          props.onChangeHandler(e.target.value);
        }}
        slotProps={{
          input: {
            endAdornment: adorment,
          },
        }}
      />
      <SearchButton searchHandler={props.searchHandler}>
        {t("Search")}
      </SearchButton>
    </Box>
  );
};
