import "../styles/globals.css";
import "katex/dist/katex.min.css";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps}>
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <Component {...pageProps} />
      </>
    </SessionProvider>
  );
}

export default MyApp;
