import { FunctionComponent } from "react";
import Head from "next/head";
import { PageError404, PageError500, PageErrorGeneric } from "@/shared/page-messages";
import { Text, Anchor } from "@/shared/ui";
import { generateUrlHome, generateUrlClientSeoStaticImage } from "@/routes";

export interface PageErrorBaseProps {
  statusCode: number;
}

export const PageErrorBase: FunctionComponent<PageErrorBaseProps> = ({ statusCode }) => {
  const link = (
    <Text align="center">
      <Anchor href={generateUrlHome()}>Click here to go back to the homepage</Anchor>
    </Text>
  );

  let errorPage = <PageErrorGeneric imageSrc={generateUrlClientSeoStaticImage({ path: { imageName: "500.png" } })} link={link} />;
  switch (statusCode) {
    case 404: {
      errorPage = <PageError404 imageSrc={generateUrlClientSeoStaticImage({ path: { imageName: "404.png" } })} link={link} />;
      break;
    }
    case 500: {
      errorPage = <PageError500 imageSrc={generateUrlClientSeoStaticImage({ path: { imageName: "500.png" } })} link={link} />;
      break;
    }
  }

  return (
    <>
      <Head>
        <meta name="robots" content="noindex"></meta>
      </Head>
      {errorPage}
    </>
  );
};
