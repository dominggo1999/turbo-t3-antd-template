import "antd/dist/reset.css";
import "../styles/globals.css";
import React from "react";
import type { AppType } from "next/app";
import { Poppins } from "next/font/google";
import Head from "next/head";
import { PwaMeta } from "components";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { api } from "utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-primary",
});

const MyApp: AppType<{
  session: Session | null;
}> = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <PwaMeta />
      </Head>
      <ThemeProvider defaultTheme="dark" attribute="class" enableSystem={false}>
        <SessionProvider session={session}>
          <main className={`${poppins.variable} font-primary`}>
            <Component {...pageProps} />
          </main>
        </SessionProvider>
      </ThemeProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
