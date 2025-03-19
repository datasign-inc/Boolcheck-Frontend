import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { ClaimerProfile } from "../../components/ClaimerProfile/ClaimerProfile.tsx";
import { fetchClaimerInfo, fetchClaimsByClaimerId } from "../../api/client.ts";
import {
  Authenticity,
  Result,
  UrlContent,
  VerifiableClaimer,
} from "../../api/types.ts";
import {
  Box,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from "@mui/material";
import { ContentItem } from "../../components/ContentItem/ContentItem.tsx";
import { ContentAuthenticity } from "../../components/ContentAuthenticity/ContentAuthenticity.tsx";
import { BoolCheckAppBar } from "../../components/BoolCheckAppBar/BoolCheckAppBar.tsx";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header.tsx";
import { BoolcheckAvatar } from "../../components/BoolcheckAvatar/BoolcheckAvatar.tsx";

interface ResolvedClaim {
  id: string;
  url: UrlContent;
  comment: string;
  authenticity: Authenticity;
}

export const ClaimerComments = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { claimerId = "" } = useParams<{ claimerId: string }>();
  const location = useLocation();
  const param = location.state;

  const [claimerInfo, setClaimerInfo] = useState<
    Result<VerifiableClaimer, string> | undefined
  >(undefined);
  const [resolvedClaims, setResolvedClaims] = useState<
    ResolvedClaim[] | undefined
  >(undefined);
  const [avatarData, setAvatarData] = useState<string | undefined>(undefined);
  const [claimerName, setClaimerName] = useState<string | undefined>(undefined);
  const [organizationName, setOrganizationName] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    (async () => {
      const cs = await fetchClaimsByClaimerId(claimerId);

      if (cs.isSuccess) {
        const resolved: ResolvedClaim[] = [];
        for (const verifiableClaim of cs.value) {
          const text = await verifiableClaim.getVerifiedClaimText();
          const boolValue = await verifiableClaim.getVerifiedClaimValue();
          resolved.push({
            id: verifiableClaim.id,
            url: verifiableClaim.url,
            comment: text ?? "",
            authenticity: boolValue ?? 0,
          });
        }
        setResolvedClaims(resolved);
      }

      const claimerInfo = await fetchClaimerInfo(claimerId);
      setClaimerInfo(claimerInfo);

      if (claimerInfo.isSuccess) {
        setClaimerName(await claimerInfo.value.getVerifiedName());
        setAvatarData(await claimerInfo.value.getVerifiedAvatar());
        setOrganizationName(
          await claimerInfo.value.getVerifiedOrganizationName()
        );
      }
    })();
  }, []);

  if (claimerInfo === undefined || resolvedClaims === undefined) {
    // todo: 画面全体でローディングを表示する必要はない。一部は描画できるはず
    return <CircularProgress />;
  }

  return (
    <>
      <Header>
        <BoolCheckAppBar
          text={t("ClaimersClaim", {
            name: claimerName ?? t("Anonymous"),
          })}
          backHandler={() => {
            if (!param) {
              navigate("/");
            } else if (!param?.commentId) {
              navigate("/");
            } else {
              navigate(`/comment_detail/${param.commentId}`);
            }
          }}
        ></BoolCheckAppBar>

        {claimerInfo.isSuccess && (
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <BoolcheckAvatar
                avatarBadge={claimerInfo.value.affiliationVcStatus}
                data={avatarData}
                name={claimerName}
                id={claimerInfo.value.sub}
              />
            </ListItemAvatar>
            <ListItemText>
              <ClaimerProfile
                attributes={[organizationName ?? t("NoAffiliation")]}
                name={claimerName ?? claimerInfo.value.sub}
                onClick={() => {
                  navigate(
                    `/claimer_profile_detail/${claimerId}`,
                    param?.commentId
                      ? {
                          state: {
                            commentId: param.commentId,
                          },
                        }
                      : {}
                  );
                }}
              />
            </ListItemText>
          </ListItem>
        )}
        <Divider />
      </Header>
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <Paper sx={{ mb: 1 }} elevation={0}>
          <List disablePadding>
            {resolvedClaims.map((c) => {
              return (
                <Box key={c.id}>
                  <Header>
                    <Box p={1}>
                      <ContentItem
                        hideAnonymousCount={true}
                        content={c.url}
                        searchQuery={""}
                        fromHome={false}
                        showUrl={false}
                        transitionToUrlComemnts={false}
                        hideCount={true}
                        jumpToContent={false}
                      />
                    </Box>
                  </Header>
                  <Box pl={1}>
                    <ContentAuthenticity
                      authenticity={c.authenticity}
                    ></ContentAuthenticity>
                    <Box mt={1} mb={4}>
                      {c.comment}
                    </Box>
                  </Box>
                  <Divider />
                </Box>
              );
            })}
          </List>
        </Paper>
      </Box>
    </>
  );
};
