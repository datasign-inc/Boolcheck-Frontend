import {
  Box,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { CountIndicator } from "../CountIndicator/CountIndicator.tsx";
import { useNavigate } from "react-router-dom";
import { calculateCount, UrlContent } from "../../api/types.ts";
import { getDomain } from "../../util/url.ts";
import { useTranslation } from "react-i18next";
import { format8601TimestampToCustomFormat } from "../../util/time.ts";

export interface ContentItemProps {
  content: UrlContent;

  searchQuery: string;
  fromHome: boolean;
  showUrl: boolean;
  transitionToUrlComemnts: boolean;
  hideCount: boolean;
  hideAnonymousCount: boolean;
  jumpToContent: boolean;
}

export const ContentItem = (props: ContentItemProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isHomeScreen = props.transitionToUrlComemnts;
  const urlCreatedTime = format8601TimestampToCustomFormat(
    props.content.createdAt
  );
  const countInfo = calculateCount(props.content);
  const urlDomain = getDomain(props.content.url);
  const content = (
    <Box>
      <ListItemText sx={{ mt: 0 }}>
        {urlDomain && (
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ display: "inline" }}
          >
            {urlDomain}
          </Typography>
        )}
        {urlCreatedTime && (
          <Typography
            variant="body2"
            color="textSecondary"
            pl={1}
            sx={{ display: "inline" }}
          >
            {urlCreatedTime}
          </Typography>
        )}
        <Typography variant="subtitle1" color="textPrimary">
          {props.content.title || t("UnTitledPage")}
        </Typography>
        {props.showUrl && (
          <Typography
            variant="body2"
            color="textPrimary"
            sx={{ wordBreak: "break-word" }}
          >
            {props.content.url}
          </Typography>
        )}
      </ListItemText>
      {(props.hideCount == undefined || !props.hideCount) && (
        <CountIndicator
          hideAnonymousCount={isHomeScreen || props.hideAnonymousCount}
          trueCount={countInfo.verifiedTrueCount}
          falseCount={countInfo.verifiedFalseCount}
          indeterminateCount={countInfo.verifiedElseCount}
          anonymousTrueCount={countInfo.anonymousTrueCount}
          anonymousFalseCount={countInfo.anonymousFalseCount}
          anonymousIndeterminateCount={countInfo.anonymousElseCount}
        />
      )}
    </Box>
  );
  return (
    <ListItem sx={{ m: 0, p: 0 }}>
      {props.transitionToUrlComemnts || props.jumpToContent ? (
        <ListItemButton
          disableGutters
          sx={isHomeScreen ? {} : { pt: 0, pl: 1, pr: 1 }}
          onClick={() => {
            if (props.transitionToUrlComemnts) {
              navigate(`/url_with_comments/${props.content.id}`, {
                state: {
                  searchQuery: props.searchQuery,
                  fromHome: props.fromHome,
                },
              });
            } else if (props.jumpToContent) {
              navigate("/jump_to_content", {
                state: {
                  target: {
                    urlUuid: props.content.id,
                    url: props.content.url,
                  },
                },
              });
            }
          }}
        >
          {content}
        </ListItemButton>
      ) : (
        <Box sx={isHomeScreen ? {} : { pt: 0, pl: 1, pr: 1 }}>{content}</Box>
      )}
    </ListItem>
  );
};
