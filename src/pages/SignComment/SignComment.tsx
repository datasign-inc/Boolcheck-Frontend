import { useLocation, useNavigate } from "react-router-dom";
import { Authenticity, UrlContent } from "../../api/types.ts";
import { BoolCheckAppBar } from "../../components/BoolCheckAppBar/BoolCheckAppBar.tsx";
import { NoteOnOpenWallet } from "../../components/NoteOnSign/NoteOnOpenWallet.tsx";
import { NoteOnSign } from "../../components/NoteOnSign/NoteOnSign.tsx";
import { Box, Link, Typography } from "@mui/material";
import { SignButton } from "../../components/Buttons/SignButton.tsx";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  fetchAuthReqUriForCommentSubmission,
  fetchAuthState,
} from "../../api/client.ts";
import { useTranslation } from "react-i18next";
import useSWR, { useSWRConfig } from "swr";
import { bunsinWalletUrl } from "../../config.ts";

export interface SignCommentParam {
  target: UrlContent;
  commentText: string;
  authenticity: Authenticity;
}

const convertAuthenticity = (authenticity: Authenticity): number => {
  switch (authenticity) {
    case -1:
      return 0;
    case 0:
      return 2;
    case 1:
      return 1;
  }
};

export const SignComment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const param: undefined | SignCommentParam = location.state;
  const { t } = useTranslation();

  const [authReqUri, setAuthReqUri] = useState<string | undefined>(undefined);
  const [errorText, setErrorText] = useState<string | undefined>(undefined);
  const { data, isLoading } = useSWR(
    authReqUri !== undefined ? "/oid4vp/comment/states" : null,
    fetchAuthState,
    { refreshInterval: 1000 }
  );
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (data?.isSuccess && data.value.value === "committed") {
      const urlUuid = param?.target.id;
      if (urlUuid !== undefined) {
        // see https://swr.vercel.app/ja/docs/advanced/cache#modify-the-cache-data
        mutate((_key) => true, undefined, { revalidate: false });
        navigate(`/url_with_comments/${urlUuid}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const clickHandler = async () => {
    if (param !== undefined) {
      const url = param.target.url;
      const comment = param.commentText;
      const boolValue = convertAuthenticity(param.authenticity);

      const authReq = await fetchAuthReqUriForCommentSubmission(
        url,
        comment,
        boolValue
      );
      if (authReq.isSuccess) {
        setAuthReqUri(authReq.value);
      } else {
        setErrorText(t("FailedToConnect"));
      }
    } else {
      setErrorText(t("RetryCommentInput"));
    }
  };

  if (param === undefined) {
    navigate("/");
  }

  // todo: Verify parameters for compliance with `SignCommentParam` or not.
  const walletInOperation = () => (
    <Typography>{t("ScanAndCompleteOperation")}</Typography>
  );
  const retry = () => <Typography>{t("FailedPleaseRetry")}</Typography>;
  const succeeded = () => <Typography>{t("Succeeded")}</Typography>;

  const renderPollingResult = () => {
    if (isLoading || data === undefined) {
      return walletInOperation();
    }
    if (data?.isSuccess) {
      if (["started", "consumed"].includes(data.value.value)) {
        return walletInOperation();
      }
      if (!["committed"].includes(data.value.value)) {
        return retry();
      }
      return succeeded();
    }
    return retry();
  };

  return (
    <>
      {param && (
        <>
          <BoolCheckAppBar
            text={t("Sign")}
            closeHandler={() => {
              navigate(`/comment_input/${param.target.id}`, {
                state: {
                  urlContent: param.target,
                  comment: {
                    commentText: param.commentText,
                    authenticity: param.authenticity,
                  },
                },
              });
            }}
          />
          <Box mt={2}>
            <Box ml={2} mr={2}>
              <NoteOnSign />
            </Box>
            <Box mt={2}>
              {authReqUri === undefined && errorText && (
                <Box
                  mt={2}
                  mb={2}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography>{errorText}</Typography>
                </Box>
              )}
              <Box display="flex" justifyContent="center" alignItems="center">
                {authReqUri === undefined ? (
                  <SignButton fullWidth size={"medium"} onClick={clickHandler}>
                    {t("SignAction")}
                  </SignButton>
                ) : (
                  <Box>
                    {renderPollingResult()}
                    <Box
                      mt={2}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <QRCodeSVG size={300} value={authReqUri} />
                    </Box>
                    <Box
                      mt={2}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Link href={authReqUri}>{t("OrClickHere")}</Link>
                    </Box>
                  </Box>
                )}
              </Box>
              <Box mt={2}>
                <NoteOnOpenWallet appStoreUrl={bunsinWalletUrl} />
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};
