import { BoolCheckAppBar } from "../../components/BoolCheckAppBar/BoolCheckAppBar.tsx";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// 一時的なコンポーネント。不要になり次第、削除する

export const CommentDeletionCompleted = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <>
      <BoolCheckAppBar text={t("CommentDeletionCompleted")} />
      <Box mt={2}>
        <Box ml={2} mr={2}>
          <Box>
            <Box>{t("CommentDeletionProcessCompleted")}</Box>
            <Box mt={4}>
              <a
                onClick={() => {
                  navigate("/");
                }}
              >
                {t("Back")}
              </a>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
