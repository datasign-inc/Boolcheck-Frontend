import { StrictMode } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home.tsx";
import { Error } from "./pages/Error/Error.tsx";
import { SearchResult } from "./pages/SearchResult/SearchResult.tsx";
import { UrlWithComments } from "./pages/UrlWithComments/UrlWithComments.tsx";
import { CommentDetail } from "./pages/CommentDetail/CommentDetail.tsx";
import { ClaimerComments } from "./pages/ClaimerComments/ClaimerComments.tsx";
import { CommentInput } from "./pages/CommentInput/CommentInput.tsx";
import { SignComment } from "./pages/SignComment/SignComment.tsx";
import { FinalCheck } from "./pages/FinalCheck/FinalCheck.tsx";
import { ClaimerProfileDetail } from "./pages/ClaimerProfileDetail/ClaimerProfileDetail.tsx";
import { DeleteComment } from "./pages/DeleteComment/DeleteComment.tsx";
import { JumpToContent } from "./pages/JumpToContent/JumpToContent.tsx";

const App = () => {
  return (
    <StrictMode>
      <Routes>
        {/* ホーム画面 */}
        <Route index element={<Home />} />

        {/* 検索結果画面 */}
        <Route
          path={"/search_result/:searchQuery"}
          element={<SearchResult />}
        />

        {/* URLに対するコメント一覧画面 */}
        <Route
          path={"/url_with_comments/:urlUuid"}
          element={<UrlWithComments />}
        />

        {/* リンクへの遷移 */}
        <Route path={"/jump_to_content"} element={<JumpToContent />} />

        {/* コメント詳細画面 */}
        <Route
          path={"/comment_detail/:commentUuid"}
          element={<CommentDetail />}
        />

        {/* ユーザーのコメント一覧画面 */}
        <Route
          path={"/claimer_comments/:claimerId"}
          element={<ClaimerComments />}
        />

        {/* コメントの作成 */}
        <Route path={"/comment_input/:urlUuid"} element={<CommentInput />} />

        {/* コメントへの署名 */}
        <Route path={"/sign_comment"} element={<SignComment />} />

        {/* コメントの削除 */}
        <Route path={"/delete_comment"} element={<DeleteComment />} />

        {/* 最終確認 */}
        <Route path={"/final-check"} element={<FinalCheck />} />

        <Route
          path={"/claimer_profile_detail/:claimerId"}
          element={<ClaimerProfileDetail />}
        />

        {/* 不明な画面 */}
        <Route path={"*"} element={<Error />} />
      </Routes>
    </StrictMode>
  );
};

export default App;
