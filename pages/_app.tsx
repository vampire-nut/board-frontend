import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";

import CssBaseline from "@mui/material/CssBaseline";
import createCache from '@emotion/cache';
import TitleHead from "@/src/components/TitleHead";
import { SidebarProvider } from "@/src/contexts/SidebarContext";
import { SessionProvider } from "next-auth/react";
import ThemeProvider from "@/src/theme/ThemeProvider";



type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface PageAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}


function createEmotionCache() {
  return createCache({
    key: 'css'
  });
}

export default function App(props: PageAppProps) {
  const {
    Component,
    emotionCache = createEmotionCache(),
    pageProps: { session, ...pageProps },
  } = props
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <TitleHead />
      <SidebarProvider>
        <ThemeProvider>
          <SessionProvider session={session}>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
          </SessionProvider>
        </ThemeProvider>
      </SidebarProvider>
    </CacheProvider>
  );
}
