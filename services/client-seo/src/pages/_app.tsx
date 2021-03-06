import { ReactNode } from "react";
import App from "next/app";
import Head from "next/head";
import { NextPage } from "next";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "@/shared/styles/theme";
import { css, injectGlobal } from "@emotion/css";
import { Global } from "@emotion/react";
import { ApolloProvider, ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { createApolloClient } from "@/shared/apollo";
import { withApollo } from "next-with-apollo";
import { isSsr, Header, ErrorBoundary } from "@/common";
import createBaseCss from "@/shared/styles/createBaseCss";
import createFontsStyles from "@/shared/styles/createFontsStyles";
import { MaintenancePage } from "@/shared/page-messages";
import { generateUrlClientSeoStaticImage } from "@/routes";
import { publicEnv } from "@/env";

if (isSsr()) {
  injectGlobal`${createBaseCss()}`;
}

class MyApp extends App {
  componentDidMount(): void {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    const isInMaintenance = publicEnv.specialMode === "maintenance";

    return (
      <>
        <Head>
          <title>{publicEnv.appName}</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        <Global
          styles={css`
            ${createFontsStyles("/client-seo-static/fonts")}
          `}
        />

        <ErrorBoundary>
          <ThemeProvider theme={theme}>
            {isInMaintenance && (
              <MaintenancePage
                appName={publicEnv.appName}
                imageSrc={generateUrlClientSeoStaticImage({ path: { imageName: "maintenance.png" } })}
              />
            )}
            {!isInMaintenance && (
              <>
                {/* This is used for static pages e.g. pages/404.tsx or pages/500.tsx.
                 * Remember to use getStaticProps to set `isStaticStatusPage`
                 */}
                {pageProps.isStaticStatusPage && (
                  <>
                    <Header isViewerMenuHidden />
                    <Component {...pageProps} />
                  </>
                )}
                {!pageProps.isStaticStatusPage && <InnerPageWithApollo component={<Component {...pageProps} />} />}
              </>
            )}
          </ThemeProvider>
        </ErrorBoundary>
      </>
    );
  }
}

interface ErrorWithCode extends Error {
  code: number;
}

const InnerPage: NextPage<{ component: ReactNode; apollo: ApolloClient<NormalizedCacheObject> }> = (props) => {
  const { component, apollo } = props;

  return (
    <ApolloProvider client={apollo}>
      <Header />
      {component}
    </ApolloProvider>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const InnerPageWithApollo: any = withApollo(
  ({ initialState, headers }) => {
    const uri = isSsr() && publicEnv.graphqlEndpointSsr ? publicEnv.graphqlEndpointSsr : publicEnv.graphqlEndpoint;

    const ssrHeaders = headers ?? {};
    // Remove host header if exists. Otherwise we'll get something like:
    // request to https://domain.com/graphql failed, reason: Hostname/IP does not match certificate's altnames:
    // Host: bucket.s3.amazonaws.com. is not in the cert's altnames: DNS:*.execute-api.us-east-1.amazonaws.com
    if ("host" in ssrHeaders) {
      delete ssrHeaders.host;
    }

    return createApolloClient({
      uri: uri,
      webSocketUri: isSsr() ? undefined : publicEnv.websocketGraphqlEndpoint, // If SSR, do not need websocket
      initialState: initialState,
      ssrHeaders: headers,
    });
  },
  {
    onError: (err, ctx) => {
      if (ctx && ctx.res && "code" in err) {
        const error = (err as unknown) as ErrorWithCode;
        ctx.res.statusCode = error.code;
        return;
      }
    },
  }
)(InnerPage);

export default MyApp;
