import { Avatar, Box } from "@mui/material";
import { generateIdenticon } from "../../util/avatar.ts";
import { LetterAvatar } from "../LetterAvatar/LetterAvatar.tsx";
import VerifiedIcon from "@mui/icons-material/Verified";
import { VerifyResult } from "../../vc/verify.ts";

export interface BoolcheckAvatarProps {
  id: string;
  name?: string;
  data?: string;
  onClick?: () => void;
  avatarBadge?: VerifyResult;
}

export const BoolcheckAvatar = (props: BoolcheckAvatarProps) => {
  const avatarData =
    props.data ?? props.name ?? generateIdenticon(props.id, 80);
  const letterAvatar = props.data === undefined && props.name !== undefined;

  const avatar = (
    <>
      {letterAvatar ? (
        <LetterAvatar letter={avatarData} onClick={props.onClick} />
      ) : (
        <Avatar src={avatarData} onClick={props.onClick} />
      )}
    </>
  );

  const avatarWithoutBadge = <Box mt={"5px"}>{avatar}</Box>;

  if (props.avatarBadge === undefined) {
    return avatarWithoutBadge;
  }

  if (props.avatarBadge !== "valid" && props.avatarBadge !== "expired") {
    return avatarWithoutBadge;
  }

  return (
    <Box position="relative" mt={"5px"}>
      <Box>{avatar}</Box>
      <Box
        position="absolute"
        top={-5}
        left={28}
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="rgba(0, 0, 0, 0)"
      >
        <VerifiedIcon
          color={props.avatarBadge === "valid" ? "primary" : "disabled"}
        />
      </Box>
    </Box>
  );
};
