import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Main from "~/common/shared-ui/Main";
import MainContent from "~/common/shared-ui/MainContent";
import { useViewer } from "~/common/components/ViewerQuery";
import generateUrlMe from "~/routes/me/generateUrlMe";
import Paper from "~/common/shared-ui/Paper";
import H1 from "~/common/shared-ui/H1";
import H2 from "~/common/shared-ui/H2";
import StandardSpace from "~/common/shared-ui/StandardSpace";
import Spinner from "~/common/shared-ui/Spinner";
import LoginForm from "./LoginForm";
import Head from "next/head";

const Login: React.FunctionComponent = () => {
  const viewer = useViewer();
  const { query } = useRouter();
  const redirectDestination = query.redirect as string;
  const redirect = (): void => window.location.assign(redirectDestination ? decodeURIComponent(redirectDestination) : generateUrlMe());

  useEffect(() => {
    if (viewer) {
      redirect();
    }
  }, [viewer]);

  if (viewer) {
    return <Spinner size="fullPage" />;
  }

  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME} | Log in</title>
        <meta name="description" content={`Log in to ${process.env.NEXT_PUBLIC_APP_NAME}`} />
        <meta name="twitter:card" content="summary" />
        <meta property="og:title" content={`${process.env.NEXT_PUBLIC_APP_NAME}`} />
        <meta property="og:description" content={`Log in to ${process.env.NEXT_PUBLIC_APP_NAME}`} />
      </Head>
      <Main fullViewPortHeight>
        <MainContent size="xs">
          <Paper>
            <H1 align="center" variant="h2">
              Log in
            </H1>
            {redirectDestination && <H2 align="center">to continue</H2>}

            <StandardSpace />

            <LoginForm redirectDestination={redirectDestination} onCompleted={redirect} />
          </Paper>
        </MainContent>
      </Main>
    </>
  );
};

export default Login;
