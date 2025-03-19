import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { fetchClaimerInfo } from "../../api/client.ts";
import { Result, VerifiableClaimer } from "../../api/types.ts";
import { Box, CircularProgress, Divider } from "@mui/material";
import { ClaimerProfileOnDetailScreen } from "../../components/ClaimerProfileOnDetailScreen/ClaimerProfileOnDetailScreen.tsx";
import { Header } from "../../components/Header/Header.tsx";
import { BoolCheckAppBar } from "../../components/BoolCheckAppBar/BoolCheckAppBar.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { ShowAllIdentityInfo } from "../../components/ShowAllIdentityInfo/ShowAllIdentityInfo.tsx";
import { IdentityCertificationAuthority } from "../../components/IdentityCertificationAuthority/IdentityCertificationAuthority.tsx";
import {
  IdentityAttribute,
  IdentityAttributes,
} from "../../components/IdentityAtrributes/IdentityAttributes.tsx";
import { IdentityVerificationStatus } from "../../components/IdentityVerificationStatus/IdentityVerificationStatus.tsx";
import { IssuerInfo } from "../../vc/verify.ts";

export const ClaimerProfileDetail = () => {
  const { claimerId = "" } = useParams<{ claimerId: string }>();
  const location = useLocation();
  const [claimerInfo, setClaimerInfo] = useState<
    Result<VerifiableClaimer, string> | undefined
  >(undefined);
  const [isShown, setIsShown] = useState<boolean>(false);
  const [claimerName, setClaimerName] = useState<string | undefined>(undefined);
  const [organizationName, setOrganizationName] = useState<string | undefined>(
    undefined
  );
  const [avatarData, setAvatarData] = useState<string | undefined>(undefined);
  const [attributes, setAttributes] = useState<IdentityAttribute[]>([]);
  const [issuerInfo, setIssuerInfo] = useState<IssuerInfo>({
    issuerName: "Unknown",
    issuerLocality: "Unknown",
    issuerState: "Unknown",
    issuerNationality: "Unknown",
    issuerAuthenticator: "Unknown",
    issuerUrl: "Unknown",
  });

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const claimerInfo = await fetchClaimerInfo(claimerId);
      setClaimerInfo(claimerInfo);

      if (claimerInfo !== undefined) {
        if (claimerInfo.isSuccess) {
          setClaimerName(await claimerInfo.value.getVerifiedName());
          setOrganizationName(
            await claimerInfo.value.getVerifiedOrganizationName()
          );
          setAttributes((await claimerInfo.value.getVerifiedAllClaims()) ?? []);
          setAvatarData(await claimerInfo.value.getVerifiedAvatar());

          const issuerInfo = await claimerInfo.value.getCredentialIssuerInfo();
          if (issuerInfo !== undefined) {
            setIssuerInfo(issuerInfo);
          }
        }
      }
    })();
  }, []);

  if (claimerInfo === undefined) {
    return <CircularProgress />;
  }

  if (!claimerInfo.isSuccess) {
    // todo: show error page
    return <CircularProgress />;
  }

  const isAnonymous = claimerInfo.value.organization === undefined;

  return (
    <>
      <Header>
        <BoolCheckAppBar
          text=""
          backHandler={() => {
            navigate(`/claimer_comments/${claimerId}`, {
              state: location.state,
            });
          }}
        ></BoolCheckAppBar>
      </Header>
      <Box>
        <ClaimerProfileOnDetailScreen
          avatarBadge={claimerInfo.value.affiliationVcStatus}
          avatarData={avatarData}
          name={claimerName}
          sub={claimerInfo.value.sub}
          organizationName={organizationName}
        ></ClaimerProfileOnDetailScreen>
      </Box>
      {!isAnonymous && (
        <>
          <Box mt={1} mb={2} display="flex" justifyContent="center">
            <ShowAllIdentityInfo
              clickHandler={() => {
                setIsShown((prev) => !prev);
              }}
            />
          </Box>
          <Box mt={1}>
            {isShown && (
              <IdentityAttributes attributes={attributes}></IdentityAttributes>
            )}
          </Box>
          <Box mt={2} mb={2}>
            <IdentityVerificationStatus
              status={claimerInfo.value.affiliationVcStatus}
            />
          </Box>
          <Divider />
          <Box ml={1} mt={1}>
            {issuerInfo && <IdentityCertificationAuthority {...issuerInfo} />}
          </Box>
        </>
      )}
    </>
  );
};
