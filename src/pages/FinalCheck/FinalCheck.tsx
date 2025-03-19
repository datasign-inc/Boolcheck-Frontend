import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import {
  ClaimBeforeCommit,
  filledWithZeroCount,
  OperationTypeForAuth,
  Result,
  UrlContent,
  VerifiableClaim,
  VerifiableClaimer,
} from "../../api/types.ts";
import { useLocation, useNavigate } from "react-router-dom";
import {
  cancelClaim,
  confirmClaim,
  fetchUrlById,
  fetchUrlMetadata,
  relayResponseCode,
} from "../../api/client.ts";

import { Box, CircularProgress, Divider } from "@mui/material";
import { BoolCheckAppBar } from "../../components/BoolCheckAppBar/BoolCheckAppBar.tsx";
import { ContentItem } from "../../components/ContentItem/ContentItem.tsx";
import { Comment } from "../../components/Comment/Comment.tsx";
import { CancelSubmissionButton } from "../../components/Buttons/CancelSubmissionButton.tsx";
import { AddTrueFalseButton } from "../../components/Buttons/AddTrueFalseButton.tsx";
import { BoolcheckDialog } from "../../components/BoolcheckDialog/BoolcheckDialog.tsx";
import { CommentDeletionCompleted } from "./CommentDeletionCompleted.tsx";

const convertToDummy = (preClaim: ClaimBeforeCommit): VerifiableClaim => {
  const value = preClaim.value;
  return new VerifiableClaim(
    `DUMMY-CLAIM-ID-${crypto.randomUUID()}`,
    value.url,
    new VerifiableClaimer(
      `DUMMY-CLAIMER-ID-${crypto.randomUUID()}`,
      value.claimer.idToken,
      value.claimer.icon,
      value.claimer.organization
    ),
    value.comment
  );
};

export const FinalCheck = () => {
  const { t } = useTranslation();
  const [content, setContent] = useState<
    Result<UrlContent, string> | undefined
  >(undefined);
  const [claim, setClaim] = useState<ClaimBeforeCommit | undefined>(undefined);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = (queryParams.get("type") || undefined) as
    | OperationTypeForAuth
    | undefined;
  const fragment = location.hash;

  const expectedFragment = "#response_code=";
  useEffect(() => {
    (async () => {
      if (type === undefined || !fragment.startsWith(expectedFragment)) {
        console.log(
          `unable to get type and response_code from url : ${type} , ${fragment}`
        );
        return;
      }
      const data = await relayResponseCode(
        type,
        fragment.replace(expectedFragment, "")
      );
      if (!data.isSuccess) {
        console.log(
          `unable to fetch claim info : ${JSON.stringify(data.error)}`
        );
        return;
      }
      switch (data.value.type) {
        case "post_comment":
          {
            console.log(`about to post a comment : ${JSON.stringify(data)}`);
            // https://datasign.slack.com/archives/C042NLJSYHE/p1737974644125669?thread_ts=1737964732.991439&cid=C042NLJSYHE
            // todo: `relayResponseCode`中のurlオブジェクトの問題が改善し次第、以下条件分岐を改善する。
            const targetClaim = data.value.value;
            const urlUuid = targetClaim.url.id;
            const urlDetail = await fetchUrlById(urlUuid);
            setContent(urlDetail);
            setClaim(data.value);
            if (!urlDetail.isSuccess && urlUuid !== undefined) {
              const urlDetailWithoutComments = await fetchUrlMetadata(urlUuid);
              if (urlDetailWithoutComments.isSuccess) {
                const urlForFirstComment = filledWithZeroCount(
                  urlDetailWithoutComments.value
                );
                setContent({
                  isSuccess: true,
                  value: urlForFirstComment,
                });
                setClaim(data.value);
              }
            }
          }
          break;
        case "delete_comment":
          console.log(`about to delete comment: ${JSON.stringify(data)}`);
          break;
        default:
          console.log(`Unknown data type: ${JSON.stringify(data)}`);
          break;
      }
    })();
  }, []);

  if (type === undefined || !fragment.startsWith(expectedFragment)) {
    console.log(
      `unable to get type and response_code from url : ${type} , ${fragment}`
    );
    // todo: error screen
    return <CircularProgress />;
  }

  if (type === "delete_comment") {
    // todo: コメント削除に対する relayResponseCode の応答にコメントのIDが含まれていれば、
    // そこに navigate することができる。以下のコンポーネントは不要となる。
    return <CommentDeletionCompleted />;
  }

  if (content === undefined || claim === undefined) {
    return <CircularProgress />;
  }
  return (
    <>
      <BoolCheckAppBar text={t("FinalCheck")}></BoolCheckAppBar>

      <Box pl={1} pr={1}>
        {content.isSuccess && (
          <ContentItem
            hideAnonymousCount={false}
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
        {claim && (
          <Comment
            {...{
              claim: convertToDummy(claim),
              transitionToDetail: false,
              transitionToClaimerComments: false,
            }}
          />
        )}
        <Divider />
      </Box>

      <Box
        mt={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
        ml={1}
        mr={1}
      >
        <Box width={1 / 3}>
          <CancelSubmissionButton
            cancelHandler={async () => {
              await cancelClaim();
              if (claim !== undefined) {
                navigate(`/url_with_comments/${claim.value.url.id}`);
              }
            }}
          >
            {t("Cancel")}
          </CancelSubmissionButton>
        </Box>

        <Box width={2 / 3}>
          <AddTrueFalseButton
            addHandler={async () => {
              if (claim === undefined) {
                console.log(`unable to get target claim`);
              } else {
                const result = await confirmClaim();
                if (result.isSuccess) {
                  const urlId = claim.value.url.id;
                  if (urlId !== undefined) {
                    navigate(
                      `/url_with_comments/${urlId}#highlight=${result.value.id}`
                    );
                  } else {
                    // todo: `relayResponseCode`中のurlオブジェクトの問題が改善し次第 本else句は削除してよい.
                    navigate("/");
                  }
                } else {
                  console.log(`unable to commit claim submission`);
                  setOpenDialog(true);
                }
              }
            }}
          >
            {t("Post")}
          </AddTrueFalseButton>
          {openDialog && (
            <BoolcheckDialog
              title={t("Failed")}
              message={t("FailedToCommitSubmission")}
              okAction={() => {
                setOpenDialog(false);
                if (claim !== undefined) {
                  navigate(`/url_with_comments/${claim.value.url.id}`);
                }
              }}
              cancelAction={undefined}
            />
          )}
        </Box>
      </Box>
    </>
  );
};
