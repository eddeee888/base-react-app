/* This file was automatically generated with route-codegen and should not be edited. */
export const patternClientSeoStaticImage = "/client-seo-static/images/:imageName";
export const originClientSeoStaticImage = "https://bam.dev";
export const patternNextJSClientSeoStaticImage = "/client-seo-static/images/[imageName]";
export type PathParamsClientSeoStaticImage = { imageName: string };
export interface PathParamsNextJSClientSeoStaticImage {
  imageName: string;
}
export const possilePathParamsClientSeoStaticImage = ["imageName"];
export interface UrlPartsClientSeoStaticImage {
  path: PathParamsClientSeoStaticImage;
  query?: Record<string, string | undefined>;
  origin?: string;
}
