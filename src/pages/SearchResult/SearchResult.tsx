import { useTranslation } from "react-i18next";
import { BoolCheckAppBar } from "../../components/BoolCheckAppBar/BoolCheckAppBar.tsx";
import { SearchBar } from "../../components/SearchBar/SearchBar.tsx";
import { ContentItem } from "../../components/ContentItem/ContentItem.tsx";
import { Founds } from "../../components/Founds/Founds.tsx";
import { EmptyResult } from "../../components/EmptyResult/EmptyResult.tsx";
import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Divider,
  List,
  Paper,
  Typography,
} from "@mui/material";
import { fetchUrls, registerUrl, fetchUrlMetadata } from "../../api/client.ts";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { Result, UrlContent } from "../../api/types.ts";
import { Header } from "../../components/Header/Header.tsx";
import { isValidHttpString } from "../../util/url.ts";
import { ConnectionFailed } from "../../components/ConnectionFailed/ConnectionFailed.tsx";

export const SearchResult = () => {
  const { t } = useTranslation();
  const [contents, setContents] = useState<
    Result<UrlContent[], string> | undefined
  >(undefined);

  const navigate = useNavigate();
  const { searchQuery = "" } = useParams<{ searchQuery: string }>();
  const [query, setQuery] = useState<string>(searchQuery);
  const [registerUrlError, setRegisterUrlError] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isCooldown, setIsCooldown] = useState(false);

  useEffect(() => {
    (async () => {
      const fetchResult = await fetchUrls(
        searchQuery,
        undefined,
        "-created_at"
      );
      setContents(fetchResult);
    })();
  }, []);

  if (contents === undefined) {
    return <CircularProgress />;
  }

  const addHandler = async (targetUrl: string) => {
    if (isProcessing || isCooldown) return;
    setIsProcessing(true);
    try {
      const newUrl = await registerUrl(targetUrl);
      if (newUrl.isSuccess) {
        const urlUuid = newUrl.value.id;
        navigate(`/comment_input/${urlUuid}`, {
          state: {
            urlContent: newUrl.value,
          },
        });
      } else if (newUrl.error.message === "Conflict") {
        const { detail } = newUrl.error;
        const getMetadata = async () => {
          if (detail) {
            const { instance } = detail;
            const id = instance.split("/").pop();
            if (id) {
              const metadata = await fetchUrlMetadata(id);
              if (metadata.isSuccess) {
                return metadata.value;
              }
            }
          }
          return null;
        };
        const metadata = await getMetadata();
        if (metadata) {
          navigate(`/comment_input/${metadata.id}`, {
            state: {
              urlContent: metadata,
            },
          });
        } else {
          setRegisterUrlError(true);
        }
      } else {
        setRegisterUrlError(true);
      }
    } finally {
      setIsProcessing(false);
      setIsCooldown(true);
      setTimeout(() => {
        setIsCooldown(false);
      }, 3000);
    }
  };

  return (
    <>
      <Header>
        <BoolCheckAppBar
          text={t("SearchResults")}
          backHandler={() => {
            navigate("/");
          }}
        ></BoolCheckAppBar>

        <Box mt={3} mb={3} ml={2}>
          <SearchBar
            text={query}
            onChangeHandler={(text: string) => {
              setQuery(text);
            }}
            clearHandler={() => {
              setQuery("");
            }}
            searchHandler={() => {
              if (query.trim() !== "" && isValidHttpString(query)) {
                setRegisterUrlError(false);
                navigate(`/search_result/${encodeURIComponent(query)}`);
              }
            }}
          ></SearchBar>
        </Box>

        {contents.isSuccess && (
          <Box mt={2} ml={2} pb={1}>
            <Founds count={contents.value.length} />
          </Box>
        )}
      </Header>

      {!contents.isSuccess && (
        <Box mt={12}>
          <ConnectionFailed />
        </Box>
      )}

      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        {contents.isSuccess && (
          <Box m={1} mt={0}>
            {0 < contents.value.length ? (
              <Paper sx={{ mt: 1, mb: 1 }} elevation={0}>
                <List disablePadding>
                  {contents.value.map((content: UrlContent) => {
                    return (
                      <Box pl={1} pr={1} key={content.id}>
                        <ContentItem
                          hideAnonymousCount={true}
                          content={content}
                          transitionToUrlComemnts={true}
                          showUrl={false}
                          hideCount={false}
                          searchQuery={searchQuery}
                          fromHome={false}
                          jumpToContent={false}
                        ></ContentItem>
                        <Divider component="li" />
                      </Box>
                    );
                  })}
                </List>
              </Paper>
            ) : (
              <Box>
                <EmptyResult
                  isProcessing={isProcessing}
                  addHandler={async () => {
                    if (query.trim() !== "" && isValidHttpString(query)) {
                      await addHandler(query);
                    }
                  }}
                />
                {registerUrlError && (
                  <Box
                    mt={3}
                    ml={2}
                    mr={2}
                    display="flex"
                    justifyContent="center"
                  >
                    <Typography>{t("RetryRegister")}</Typography>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        )}
      </Box>
    </>
  );
};
