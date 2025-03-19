import { useLocation, useNavigate } from "react-router-dom";
import { BoolCheckAppBar } from "../../components/BoolCheckAppBar/BoolCheckAppBar.tsx";
import { useTranslation } from "react-i18next";
import { Box, Link } from "@mui/material";

interface JumpToContentParam {
  target: {
    urlUuid: string;
    url: string;
  };
}

export const JumpToContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const param: undefined | JumpToContentParam = location.state;
  const { t } = useTranslation();

  if (param === undefined) {
    navigate("/");
  }

  return (
    <>
      <BoolCheckAppBar
        text={t("JumpToContent")}
        backHandler={() => {
          if (param?.target.urlUuid !== undefined) {
            // todo: `/url_with_comments`以外の画面から本画面にアクセスする場合は、以下を可変にするように要修正
            navigate(`/url_with_comments/${param?.target.urlUuid}`);
          } else {
            console.log(`Unknown where to return to the screen.`);
            navigate(`/`);
          }
        }}
      />
      <Box mt={1} ml={2} mr={2}>
        <Box>{t("JumpToContentMessage")}</Box>
        <Box mt={1}>
          <Link
            href={param?.target.url ?? ""}
            rel="noopener noreferrer"
            target="_blank"
          >
            {param?.target.url}
          </Link>
        </Box>
      </Box>
    </>
  );
};
