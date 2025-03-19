import { useLocation, useNavigate } from "react-router-dom";
import { BoolCheckAppBar } from "../../components/BoolCheckAppBar/BoolCheckAppBar.tsx";
import { Box, Link, Typography } from "@mui/material";
import { SignButton } from "../../components/Buttons/SignButton.tsx";
import { QRCodeSVG } from "qrcode.react";
import { NoteOnOpenWallet } from "../../components/NoteOnSign/NoteOnOpenWallet.tsx";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import {
  fetchAuthReqUriForCommentDeletion,
  fetchAuthState,
} from "../../api/client.ts";
import { NoteOnDeletion } from "../../components/NoteOnDeletion/NoteOnDeletion.tsx";
import useSWR from "swr";
import { bunsinWalletUrl } from "../../config.ts";

export interface DeleteCommentParam {
  claimId: string;
  urlUuid: string;
}

export const DeleteComment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const param: undefined | DeleteCommentParam = location.state;

  const [authReqUri, setAuthReqUri] = useState<string | undefined>(undefined);
  const [errorText, setErrorText] = useState<string | undefined>(undefined);
  const { data, isLoading } = useSWR(
    authReqUri !== undefined ? "/oid4vp/comment/states" : null,
    fetchAuthState,
    { refreshInterval: 1000 }
  );

  useEffect(() => {
    if (data?.isSuccess && data.value.value === "committed") {
      const urlUuid = param?.urlUuid;
      if (urlUuid !== undefined) {
        navigate(`/url_with_comments/${urlUuid}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const clickHandler = async () => {
    if (param !== undefined) {
      const claimId = param.claimId;
      const authReq = await fetchAuthReqUriForCommentDeletion(claimId);
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
      if (data.value.value === "started") {
        return walletInOperation();
      }
      if (!["consumed", "committed"].includes(data.value.value)) {
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
            text={t("DeleteComment")}
            closeHandler={() => {
              navigate(`/comment_detail/${param.claimId}`);
            }}
          />
          <Box mt={4}>
            <Box ml={2} mr={2}>
              <NoteOnDeletion />
            </Box>
            <Box mt={6}>
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
                    {t("Authenticate")}
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
