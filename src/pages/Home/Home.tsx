import { SearchBar } from "../../components/SearchBar/SearchBar.tsx";
import { SortTab } from "../../components/SortTab/SortTab.tsx";
import { ContentItem } from "../../components/ContentItem/ContentItem.tsx";
import { EmptyResult } from "../../components/EmptyResult/EmptyResult.tsx";
import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Divider,
  List,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { fetchUrls } from "../../api/client.ts";
import { useNavigate } from "react-router-dom";
import { Result, UrlContent, UrlSortKey } from "../../api/types.ts";
import { Header } from "../../components/Header/Header.tsx";
import { isValidHttpString } from "../../util/url.ts";
import { ConnectionFailed } from "../../components/ConnectionFailed/ConnectionFailed.tsx";
import { mediaQuery } from "../../config.ts";

export const Home = () => {
  const navigate = useNavigate();
  const [rawSearchQuery, setRawSearchQuery] = useState<string>("");
  const [contents, setContents] = useState<
    Result<UrlContent[], string> | undefined
  >(undefined);

  const isLargeScreen = useMediaQuery(mediaQuery);
  const scale = isLargeScreen ? 1 : 1.5;

  useEffect(() => {
    (async () => {
      const fetchResult = await fetchUrls(undefined, undefined, "-created_at");
      setContents(fetchResult);
    })();
  }, []);

  if (contents === undefined) {
    // todo: 画面全体でローディングを表示する必要はない。一部は描画できるはず
    return <CircularProgress />;
  }

  return (
    <>
      <Header>
        <Box
          mt={12 / scale}
          mb={6 / scale}
          display="flex"
          justifyContent="center"
        >
          <img width="60%" src={"/images/Boolcheck.svg"} />
        </Box>
        <Box mt={10 / scale} mb={10 / scale} ml={2}>
          <SearchBar
            text={rawSearchQuery}
            onChangeHandler={(text: string) => {
              setRawSearchQuery(text);
            }}
            clearHandler={() => {
              setRawSearchQuery("");
            }}
            searchHandler={() => {
              if (
                rawSearchQuery.trim() !== "" &&
                isValidHttpString(rawSearchQuery)
              ) {
                const query = encodeURIComponent(rawSearchQuery);
                navigate(`/search_result/${query}`);
              }
            }}
          ></SearchBar>
        </Box>
        <SortTab
          onChangeTabHandler={(sortKey: UrlSortKey, startDate?: string) => {
            (async () => {
              const fetchResult = await fetchUrls("", startDate, sortKey);
              setContents(fetchResult);
            })();
          }}
        ></SortTab>
      </Header>

      {!contents.isSuccess && (
        <Box mt={12}>
          <ConnectionFailed />
        </Box>
      )}

      {contents.isSuccess && (
        <Box m={1} sx={{ flexGrow: 1 }}>
          {0 < contents.value.length ? (
            <Paper sx={{ mb: 1 }} elevation={0}>
              <List disablePadding>
                {contents.value.map((content: UrlContent) => {
                  return (
                    <Box pl={1} pr={1} key={content.id}>
                      <ContentItem
                        content={content}
                        transitionToUrlComemnts={true}
                        hideAnonymousCount={true}
                        showUrl={false}
                        hideCount={false}
                        fromHome={true}
                        searchQuery={""}
                        jumpToContent={false}
                      ></ContentItem>
                      <Divider component="li" />
                    </Box>
                  );
                })}
              </List>
            </Paper>
          ) : (
            <EmptyResult />
          )}
        </Box>
      )}
    </>
  );
};
