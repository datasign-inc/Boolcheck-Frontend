import { useTranslation } from "react-i18next";
import { BoolCheckAppBar } from "../../components/BoolCheckAppBar/BoolCheckAppBar.tsx";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { fetchClaimById, fetchUrlById } from "../../api/client.ts";
import { Comment } from "../../components/Comment/Comment.tsx";
import { ContentItem } from "../../components/ContentItem/ContentItem.tsx";
import { ShareToSns } from "../../components/ShareToSns/ShareToSns.tsx";
import { Box, CircularProgress, Divider } from "@mui/material";
import { Result, UrlContent, VerifiableClaim } from "../../api/types.ts";
import { backendUrls } from "../../config.ts";

const commentUrl = (commentUuid: string): string => {
  return `${backendUrls.app}/comment_detail/${commentUuid}`;
};

export const CommentDetail = () => {
  const { t } = useTranslation();
  const [content, setContent] = useState<
    Result<UrlContent, string> | undefined
  >(undefined);
  const [claim, setClaim] = useState<
    Result<VerifiableClaim, string> | undefined
  >(undefined);

  const { commentUuid = "" } = useParams<{ commentUuid: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const claim = await fetchClaimById(commentUuid);
      if (claim.isSuccess) {
        const urlUuid = claim.value.url.id;
        const urlDetail = await fetchUrlById(urlUuid);
        setContent(urlDetail);
        setClaim(claim);
      }
    })();
  }, []);

  if (content === undefined || claim === undefined) {
    // todo: 画面全体でローディングを表示する必要はない。一部は描画できるはず
    return <CircularProgress />;
  }

  const isVerifiedClaimer = claim.isSuccess
    ? claim.value.claimer.status === "valid"
    : false;

  return (
    <Box display={"flex"} flexDirection={"column"} height={"100dvh"}>
      <Box flex={1}>
        <BoolCheckAppBar
          text={t("CommentDetail")}
          backHandler={() => {
            const urlUuid = claim.isSuccess ? claim.value.url.id : "";
            if (urlUuid === "") {
              navigate("/");
            } else {
              navigate(`/url_with_comments/${urlUuid}`);
            }
          }}
        ></BoolCheckAppBar>

        <Box pl={1} pr={1}>
          {content.isSuccess && (
            <ContentItem
              hideAnonymousCount={isVerifiedClaimer}
              content={content.value}
              showUrl={true}
              transitionToUrlComemnts={false}
              hideCount={false}
              searchQuery={""}
              fromHome={false}
              jumpToContent={false}
            />
          )}
        </Box>
        <Box mt={1}>
          <Divider />
          {claim.isSuccess && (
            <Comment
              {...{
                claim: claim.value,
                transitionToDetail: false,
                transitionToClaimerComments: true,
              }}
            />
          )}
        </Box>
      </Box>

      <Box>
        <Divider />
        <Box mt={2} mb={2}>
          <ShareToSns url={commentUrl(commentUuid)} />
        </Box>
      </Box>
    </Box>
  );
};
