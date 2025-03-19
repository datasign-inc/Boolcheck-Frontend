import { Box } from "@mui/material";
import { VoteTrueButton } from "../Buttons/VoteTrueButton.tsx";
import { VoteFalseButton } from "../Buttons/VoteFalseButton.tsx";
import { VoteIndeterminateButton } from "../Buttons/VoteIndeterminateButton.tsx";

export interface VoteProps {
  buttonHandler: (index: number) => void;
  buttonIndex?: number;
}

export const Vote = (props: VoteProps) => {
  const clickedTrue = props.buttonIndex === 0;
  const clickedFalse = props.buttonIndex === 1;
  const clickedIndeterminate = props.buttonIndex === 2;
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <VoteTrueButton
        buttonHandler={props.buttonHandler}
        isClicked={clickedTrue}
      />
      <VoteFalseButton
        buttonHandler={props.buttonHandler}
        isClicked={clickedFalse}
      />
      <VoteIndeterminateButton
        buttonHandler={props.buttonHandler}
        isClicked={clickedIndeterminate}
      />
    </Box>
  );
};
