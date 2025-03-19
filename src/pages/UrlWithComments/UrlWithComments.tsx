import { ContentItem } from "../../components/ContentItem/ContentItem.tsx";
import { Box, CircularProgress, Divider, List, Paper } from "@mui/material";
import { FilterVerified } from "../../components/FilterVerified/FilterVerified.tsx";
import { useEffect, useState } from "react";
import { BoolCheckAppBar } from "../../components/BoolCheckAppBar/BoolCheckAppBar.tsx";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { fetchClaimsByUrlId, fetchUrlById } from "../../api/client.ts";
import { Comment } from "../../components/Comment/Comment.tsx";
import { VerifiableClaim } from "../../api/types.ts";
import { AddTrueFalseButton } from "../../components/Buttons/AddTrueFalseButton.tsx";
import { Header } from "../../components/Header/Header.tsx";
import { getToggleState, setToggleState } from "../../util/toggleStateStore.ts";
import useSWR from "swr";
import { workaroundUniqueClaims } from "../../util/workaround.ts";

export interface UrlWithCommentsProps {
  urlUuid: string;
  searchQuery: string;
  fromHome: boolean;
}

const filterComments = (comments: VerifiableClaim[], onlyVerified: boolean) => {
  if (onlyVerified) {
    return comments.filter((comment) => {
      return comment.claimer.status === "valid";
    });
  } else {
    return comments;
  }
};

export const UrlWithComments = () => {
  const { t } = useTranslation();
  const [filtered, setFiltered] = useState<boolean>(getToggleState());
  const [commentsToDisplay, setCommentsToDisplay] = useState<VerifiableClaim[]>(
    []
  );

  const navigate = useNavigate();
  const location = useLocation();
  const fragment = location.hash;
  const param = location.state;
  const { urlUuid = "" } = useParams<{ urlUuid: string }>();
  const expectedFragment = "#highlight=";

  const swrOption = {
    revalidateOnFocus: true,
    shouldRetryOnError: true,
    errorRetryInterval: 2500,
    errorRetryCount: 6,
  };

  const { data: content } = useSWR(
    `/database/urls/${urlUuid}`,
    async () => {
      const ret = await fetchUrlById(urlUuid);
      if (ret.isSuccess) {
        return ret.value;
      }
      throw ret.error;
    },
    { ...swrOption }
  );

  const { data: allComments } = useSWR(
    `/database/urls/${urlUuid}/claims`,
    async () => {
      const ret = await fetchClaimsByUrlId(urlUuid);
      if (ret.isSuccess) {
        return workaroundUniqueClaims(ret.value);
      }
      throw ret.error;
    },
    { ...swrOption, refreshInterval: 2500 }
  );

  useEffect(() => {
    if (allComments !== undefined) {
      setCommentsToDisplay(filterComments(allComments, filtered));
    }
  }, [allComments]);

  if (content === undefined) {
    return <CircularProgress />;
  }

  const countMessageOnFilterLabel = filtered
    ? t("CountMessage", { countMessage: commentsToDisplay.length })
    : t("CountMessage", {
        countMessage: commentsToDisplay.length,
      });

  const appBar = (
    <BoolCheckAppBar
      text={t("ContentAndComments")}
      backHandler={() => {
        console.log(`parameter : ${JSON.stringify(param)}`);
        if (!param) {
          navigate("/");
        } else if (
          param.fromHome ||
          param.searchQuery === undefined ||
          param.searchQuery === ""
        ) {
          navigate("/");
        } else {
          navigate(`/search_result/${encodeURIComponent(param.searchQuery)}`);
        }
      }}
    ></BoolCheckAppBar>
  );

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          overflow: "auto",
        }}
      >
        <Header>
          {appBar}
          <Box pl={1} pr={1}>
            <ContentItem
              content={content}
              showUrl={true}
              transitionToUrlComemnts={false}
              hideCount={false}
              hideAnonymousCount={filtered}
              searchQuery={""}
              fromHome={false}
              jumpToContent={true}
            />

            <Box mt={1}>
              <Divider />
              <Box ml={2} mt={1.5} pb={1.5}>
                <FilterVerified
                  countMessage={countMessageOnFilterLabel}
                  checked={filtered}
                  onChangeHandler={(newValue: boolean) => {
                    setFiltered(newValue);
                    if (allComments !== undefined) {
                      setCommentsToDisplay(
                        filterComments(allComments, newValue)
                      );
                    }
                    setToggleState(newValue);
                  }}
                ></FilterVerified>
              </Box>
            </Box>
          </Box>
        </Header>

        <Box m={1} mt={0}>
          {allComments !== undefined ? (
            <>
              <Paper sx={{ mb: 1 }} elevation={0}>
                <List disablePadding>
                  {commentsToDisplay.map((c: VerifiableClaim) => {
                    const isHighLight =
                      c.id === fragment.replace(expectedFragment, "");
                    const prop = {
                      claim: c,
                      justAdded: isHighLight,
                      transitionToDetail: true,
                      transitionToClaimerComments: false,
                    };
                    return (
                      <div key={c.id}>
                        <Comment {...prop} />
                        <Divider component="li" />
                      </div>
                    );
                  })}
                </List>
              </Paper>
            </>
          ) : (
            <Box mt={12} display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          )}
        </Box>
      </Box>

      {allComments !== undefined && (
        <Box m={1}>
          <AddTrueFalseButton
            addHandler={() => {
              navigate(`/comment_input/${urlUuid}`);
            }}
          >
            {t("AddClaimButton")}
          </AddTrueFalseButton>
        </Box>
      )}
    </>
  );
};
