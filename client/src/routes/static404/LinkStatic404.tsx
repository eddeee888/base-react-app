/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import generateUrl from "route-codegen/generateUrl";
import Link, { AnchorProps } from "common/shared-ui/Anchor";
import { patternStatic404, UrlPartsStatic404, originStatic404 } from "./patternStatic404";
type LinkStatic404Props = Omit<AnchorProps, "href"> & UrlPartsStatic404;
const LinkStatic404: React.FunctionComponent<LinkStatic404Props> = ({ urlQuery, origin, ...props }) => {
  const to = generateUrl(patternStatic404, {}, urlQuery, origin ?? originStatic404);
  return <Link {...props} href={to} />;
};
export default LinkStatic404;