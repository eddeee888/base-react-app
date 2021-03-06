import { FunctionComponent } from "react";
import { Fab, FabProps } from "@material-ui/core";
import { css, cx } from "@emotion/css";

const floatingButtonClassName = css`
  position: fixed !important;
  right: 20px;
  bottom: 15px;
`;

export const FloatingButton: FunctionComponent<FabProps> = ({ className, ...props }) => {
  return <Fab color="primary" className={cx([className, floatingButtonClassName])} {...props} />;
};
