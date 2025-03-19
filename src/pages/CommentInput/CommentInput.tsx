import { useTranslation } from "react-i18next";
import { BoolCheckAppBar } from "../../components/BoolCheckAppBar/BoolCheckAppBar.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { fetchUrlMetadata } from "../../api/client.ts";
import {
  Authenticity,
  filledWithZeroCount,
  Result,
  UrlContent,
} from "../../api/types.ts";
import { ContentItem } from "../../components/ContentItem/ContentItem.tsx";
import { Vote } from "../../components/Vote/Vote.tsx";
import { CommentInputField } from "../../components/CommentInputField/CommentInputField.tsx";
import { NoteOnSubmission } from "../../components/NoteOnSubmission/NoteOnSubmission.tsx";
import { Box, CircularProgress, Divider } from "@mui/material";
import { SubmitButton } from "../../components/Buttons/Submit.tsx";

const convertButtonIndexToAuthenticity = (index: number): Authenticity => {
  return (Number(index === 0) - Number(index === 1)) as Authenticity;
};

const convertAuthenticityToButtonIndex = (
  authenticity: Authenticity
): number => {
  return authenticity === 1 ? 0 : authenticity === -1 ? 1 : 2;
};

const getDefaultTextFromState = (state: unknown): string => {
  if (state === undefined) {
    return "";
  } else {
    // @ts-expect-error `commentText` may exist
    const value = state?.commentText;
    return value ?? "";
  }
};

const getDefaultIndexFromState = (state: unknown): undefined | number => {
  if (state === undefined) {
    return undefined;
  } else {
    // @ts-expect-error `authenticity` prop may exist
    const value = state?.authenticity;
    if (value === undefined) {
      return undefined;
    }
    return convertAuthenticityToButtonIndex(value as Authenticity);
  }
};

export const CommentInput = () => {
  const { t } = useTranslation();

  const location = useLocation();
  const param = location.state;
  const comment = param?.comment;
  const urlContentFromState = param?.urlContent as UrlContent | undefined;

  const [commentText, setCommentText] = useState(
    getDefaultTextFromState(comment)
  );

  const [buttonIndex, setButtonIndex] = useState<number | undefined>(
    getDefaultIndexFromState(comment)
  );

  const [content, setContent] = useState<
    Result<UrlContent, string> | undefined
  >(undefined);
  const navigate = useNavigate();
  const { urlUuid = "" } = useParams<{ urlUuid: string }>();

  useEffect(() => {
    (async () => {
      const urlDetail = await fetchUrlMetadata(urlUuid);
      if (urlDetail.isSuccess) {
        setContent({
          isSuccess: true,
          value: filledWithZeroCount(urlDetail.value),
        });
      } else if (urlContentFromState !== undefined) {
        setContent({
          isSuccess: true,
          value: urlContentFromState,
        });
      }
    })();
  }, []);

  if (!content) {
    // todo: 画面全体でローディングを表示する必要はない。一部は描画できるはず
    return <CircularProgress />;
  }

  return (
    <>
      <BoolCheckAppBar
        text={t("SubmitClaim")}
        backHandler={() => {
          // コメントを付けずにキャンセルする場合は、url_with_comments 画面が構成できないため、homeに戻る
          if (urlContentFromState !== undefined) {
            navigate(`/`);
          } else {
            navigate(`/url_with_comments/${urlUuid}`);
          }
        }}
      ></BoolCheckAppBar>
      <Box m={1} mt={0}>
        <Box>
          {content.isSuccess && (
            <ContentItem
              hideAnonymousCount={false}
              content={content.value}
              showUrl={true}
              transitionToUrlComemnts={false}
              hideCount={true}
              searchQuery={""}
              fromHome={false}
              jumpToContent={false}
            />
          )}
        </Box>
        <Divider />
        <Box mt={1}>
          <Vote
            buttonIndex={buttonIndex}
            buttonHandler={(index: number) => {
              if (index === buttonIndex) {
                setButtonIndex(undefined);
              } else {
                setButtonIndex(index);
              }
            }}
          />
          <Box mt={1}>
            <CommentInputField
              value={commentText}
              onChangeHandler={(newText: string) => {
                setCommentText(newText);
              }}
            />
            <NoteOnSubmission />
          </Box>
        </Box>
        <Divider />
        <Box mt={1} display="flex" justifyContent="center" alignItems="center">
          <SubmitButton
            onClick={() => {
              if (buttonIndex !== undefined) {
                if (content.isSuccess) {
                  navigate("/sign_comment", {
                    state: {
                      target: content.value,
                      commentText: commentText,
                      authenticity:
                        convertButtonIndexToAuthenticity(buttonIndex),
                    },
                  });
                }
              }
            }}
          >
            {t("Submit")}
          </SubmitButton>
        </Box>
      </Box>
    </>
  );
};
