import { Box } from "@mui/material";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import {
  FacebookIcon,
  FacebookShareButton,
  HatenaIcon,
  HatenaShareButton,
  TwitterShareButton,
  XIcon,
} from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyToClipBoardButton } from "../Buttons/CopyToClickBoardButton.tsx";

export interface ShareToSnsProps {
  url: string;
}

export const ShareToSns = (props: ShareToSnsProps) => {
  const iconSize = 44;
  return (
    <Box display="flex" justifyContent="center">
      <Box m={1}>
        <FacebookShareButton url={props.url}>
          <FacebookIcon size={iconSize} round={false} borderRadius={12} />
        </FacebookShareButton>
      </Box>
      <Box m={1}>
        <TwitterShareButton url={props.url}>
          <XIcon size={iconSize} round={false} borderRadius={12} />
        </TwitterShareButton>
      </Box>
      <Box m={1}>
        <HatenaShareButton url={props.url}>
          <HatenaIcon size={iconSize} round={false} borderRadius={12} />
        </HatenaShareButton>
      </Box>
      <Box m={1}>
        <CopyToClipboard text={props.url}>
          <CopyToClipBoardButton
            variant={"contained"}
            sx={{
              width: `${iconSize}px`,
              height: `${iconSize}px`,
              minWidth: "0",
            }}
          >
            <ContentPasteIcon />
          </CopyToClipBoardButton>
        </CopyToClipboard>
      </Box>
    </Box>
  );
};
