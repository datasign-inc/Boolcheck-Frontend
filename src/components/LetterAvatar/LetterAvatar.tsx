import { Box, Typography } from "@mui/material";

export interface LetterAvatarProps {
  letter: string;
  onClick?: () => void;
}

export const LetterAvatar = (props: LetterAvatarProps) => {
  const firstChar = props.letter.substring(0, 1);
  return (
    <Box
      onClick={props.onClick}
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
      }}
      bgcolor={"#56A7C1"}
    >
      <Typography color={"white"}>{firstChar}</Typography>
    </Box>
  );
};
