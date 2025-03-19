import {
  Box,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { ClaimerProfile } from "../ClaimerProfile/ClaimerProfile.tsx";
import { ContentAuthenticity } from "../ContentAuthenticity/ContentAuthenticity.tsx";
import { useNavigate } from "react-router-dom";
import { Authenticity, VerifiableClaim } from "../../api/types.ts";
import { useEffect, useState } from "react";
import { CommentMenu } from "../CommentMenu/CommentMenu.tsx";
import { BoolcheckAvatar } from "../BoolcheckAvatar/BoolcheckAvatar.tsx";
import { useTranslation } from "react-i18next";
import { formatUnixTimestampToCustomFormat } from "../../util/time.ts";

export interface CommentProps {
  claim: VerifiableClaim;
  justAdded?: boolean;
  transitionToClaimerComments: boolean;
  transitionToDetail: boolean;
}

export const Comment = (props: CommentProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [claimerName, setClaimerName] = useState<string | undefined>(undefined);
  const [organizationName, setOrganizationName] = useState<string | undefined>(
    undefined
  );
  const [avatarData, setAvatarData] = useState<string | undefined>(undefined);
  const [commentText, setCommentText] = useState<string>("");
  const [authenticity, setAuthenticity] = useState<Authenticity>(0);

  useEffect(() => {
    (async () => {
      const name = await props.claim.claimer.getVerifiedName();
      const organizationName =
        await props.claim.claimer.getVerifiedOrganizationName();
      const avatar = await props.claim.claimer.getVerifiedAvatar();
      const commentText = await props.claim.getVerifiedClaimText();
      const authenticity = await props.claim.getVerifiedClaimValue();

      setClaimerName(name);
      setOrganizationName(organizationName);
      setAvatarData(avatar);

      if (commentText !== undefined) {
        setCommentText(commentText);
      }
      if (authenticity !== undefined) {
        setAuthenticity(authenticity);
      }
    })();
  }, []);

  const timestamp = props.claim.getTimestamp();
  const timestampInCustomFormat = timestamp
    ? formatUnixTimestampToCustomFormat(timestamp)
    : undefined;

  const content = (
    <>
      <ListItemAvatar>
        <BoolcheckAvatar
          avatarBadge={props.claim.claimer.affiliationVcStatus}
          data={avatarData}
          name={claimerName}
          id={props.claim.claimer.sub}
          onClick={() => {
            if (props.transitionToClaimerComments) {
              navigate(`/claimer_comments/${props.claim.claimer.id}`, {
                state: {
                  commentId: props.claim.id,
                },
              });
            }
          }}
        />
      </ListItemAvatar>
      <ListItemText>
        <ClaimerProfile
          attributes={[organizationName ?? t("NoAffiliation")]}
          name={claimerName ?? props.claim.claimer.sub}
        />
        {timestampInCustomFormat && (
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ display: "inline" }}
          >
            {timestampInCustomFormat}
          </Typography>
        )}
        <ContentAuthenticity authenticity={authenticity}></ContentAuthenticity>
        <Box mt={1}>
          <Typography
            variant="subtitle2"
            sx={{
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {commentText}
          </Typography>
        </Box>
      </ListItemText>
    </>
  );

  const deleteHandler = () => {
    navigate(`/delete_comment`, {
      state: {
        claimId: props.claim.id,
        urlUuid: props.claim.url.id,
      },
    });
  };

  // todo: sx={props.justAdded ? { backgroundColor: "#e6e6fa" } : {}}
  return (
    <ListItem sx={props.justAdded ? { backgroundColor: "#e6e6fa" } : {}}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        width="100%"
      >
        {props.transitionToDetail ? (
          <Box flexGrow={1}>
            <ListItemButton
              alignItems="flex-start"
              sx={{ p: 0 }}
              onClick={() => {
                navigate(`/comment_detail/${props.claim.id}`);
              }}
            >
              {content}
            </ListItemButton>
          </Box>
        ) : (
          <>{content}</>
        )}
        <Box>
          <CommentMenu deleteHandler={deleteHandler}></CommentMenu>
        </Box>
      </Box>
    </ListItem>
  );
};
