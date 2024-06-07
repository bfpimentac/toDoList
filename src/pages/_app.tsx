import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "../utils/api";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import theme from "@/styles/theme";
import isPropValid from "@emotion/is-prop-valid";
import GlobalStyle from "@/styles/global";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <StyleSheetManager shouldForwardProp={isPropValid}>
      <ThemeProvider theme={{ ...theme }}>
        <SessionProvider session={session}>
          <GlobalStyle />
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeProvider>
    </StyleSheetManager>
  );
};

export default api.withTRPC(MyApp);
