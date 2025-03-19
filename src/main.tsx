import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./i18n/configs.ts";
import "./index.css";
import { setupMockApiServer } from "./api/mock/mock-api-server.ts";
import { AppBar, Box, Toolbar, Typography, useMediaQuery } from "@mui/material";
import { BrowserRouter, Link } from "react-router-dom";
import { mediaQuery } from "./config.ts";
import { BoolcheckFooter } from "./components/BoolcheckFooter/BoolcheckFooter.tsx";

if (import.meta.env.DEV) {
  setupMockApiServer();
}

const Main = () => {
  const isLargeScreen = useMediaQuery(mediaQuery);

  return (
    <>
      <BrowserRouter>
        {isLargeScreen ? (
          <>
            {/* AppBar固定表示 */}
            <AppBar position="sticky" sx={{ bgcolor: "#3B3B3B" }}>
              <Toolbar variant="dense">
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "inline-block",
                  }}
                >
                  <Typography variant="h6" color="inherit" component="div">
                    Boolcheck
                  </Typography>
                </Link>
              </Toolbar>
            </AppBar>
            <Box
              bgcolor={"#C5C5C5"}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                bgcolor={"#FFFFFF"}
                sx={{
                  // AppBarの高さ分を引き算. dense以外を使う場合は別途用修正
                  height: "calc(100vh - 48px - 24px)",
                  minHeight: "calc(100vh - 48px - 24px)",
                  width: "100%",
                  maxWidth: "600px",
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "auto",
                }}
              >
                <App />
              </Box>
            </Box>
            <BoolcheckFooter />
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100dvh",
              minHeight: "100dvh",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#F9F9F9",
                flex: 1, // 余白を全て埋める
              }}
            >
              <App />
            </Box>
            <BoolcheckFooter />
          </Box>
        )}
      </BrowserRouter>
    </>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
