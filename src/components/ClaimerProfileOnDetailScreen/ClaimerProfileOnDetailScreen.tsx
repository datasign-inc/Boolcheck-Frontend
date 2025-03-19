import { Box, Typography } from "@mui/material";
import { AnonymousClaimer } from "../AnonymousClaimer/AnonymousClaimer.tsx";
import { BoolcheckAvatar } from "../BoolcheckAvatar/BoolcheckAvatar.tsx";
import { VerifyResult } from "../../vc/verify.ts";
import { subPrefix } from "../ClaimerProfile/ClaimerProfile.tsx";

export interface ProfileSummaryProps {
  avatarData?: string;
  name?: string;
  sub: string;
  organizationName?: string;
  avatarBadge?: VerifyResult;
}

export const ClaimerProfileOnDetailScreen = (props: ProfileSummaryProps) => {
  return (
    <Box>
      <Box display="flex" justifyContent="center">
        <BoolcheckAvatar
          avatarBadge={props.avatarBadge}
          data={props.avatarData}
          name={props.name}
          id={props.sub}
        />
      </Box>

      {props.name && (
        <Box display="flex" justifyContent="center" mt={1} mb={1}>
          <Typography variant="h5">{props.name}</Typography>
        </Box>
      )}

      <Box mt={1} display="flex" justifyContent="center">
        <Box
          width={"80%"}
          display="flex"
          justifyContent="center"
          sx={{ overflowWrap: "anywhere", wordBreak: "break-all" }}
        >
          {`ID: ${props.sub.replace(subPrefix, "")}`}
        </Box>
      </Box>

      <Box display="flex" justifyContent="center">
        {props.organizationName ? (
          <Typography>{props.organizationName}</Typography>
        ) : (
          <AnonymousClaimer />
        )}
      </Box>
    </Box>
  );
};
