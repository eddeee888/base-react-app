import { FunctionComponent } from "react";
import { css } from "@emotion/css";
import { Logo } from "@/shared/ui";
import { Grid } from "@material-ui/core";
import { LinkHome } from "@/routes";
import { headerHeight } from "@/shared/styles/sizes";
import { primaryBackgroundColor, borderColor } from "@/shared/styles/colors";
import { theme } from "@/shared/styles/theme";
import { ViewerMenu } from "./ViewerMenu";

const headerClassName = css`
  width: 100%;
  padding: 0 1rem;
  position: fixed;
  top: 0px;
  height: ${headerHeight};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${primaryBackgroundColor};
  border-bottom: 1px solid ${borderColor};
  z-index: 1201;

  ${theme.breakpoints.up("md")} {
    padding: 0 2rem;
  }
`;

const logoClassName = css`
  display: block;
`;

export interface HeaderProps {
  isViewerMenuHidden?: boolean;
}

export const Header: FunctionComponent<HeaderProps> = ({ isViewerMenuHidden }) => {
  return (
    <header className={headerClassName}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <LinkHome>
            <Logo className={logoClassName} />
          </LinkHome>
        </Grid>

        {!isViewerMenuHidden && <ViewerMenu />}
      </Grid>
    </header>
  );
};
