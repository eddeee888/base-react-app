/* This file was automatically generated with route-codegen and should not be edited. */
import { generateUrl } from "@route-codegen/utils";
import { patternStatic404, UrlPartsStatic404, originStatic404 } from "./patternStatic404";
const generateUrlStatic404 = (urlParts?: UrlPartsStatic404): string =>
  generateUrl(patternStatic404, {}, urlParts?.query, urlParts?.origin ?? originStatic404);
export default generateUrlStatic404;