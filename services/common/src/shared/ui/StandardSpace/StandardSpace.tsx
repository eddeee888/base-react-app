import { FunctionComponent } from "react";
import { Box } from "@material-ui/core";
import { css } from "@emotion/css";

const fullWidthClassname = css`
  width: 100%;
`;

export interface StandardSpaceProps {
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
}

export const StandardSpace: FunctionComponent<StandardSpaceProps> = ({ size = 2 }) => {
  return <Box className={fullWidthClassname} marginBottom={size} />;
};
