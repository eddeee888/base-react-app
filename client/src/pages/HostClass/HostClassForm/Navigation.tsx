import Grid from '@material-ui/core/Grid';
import React from 'react';
import Button from 'src/common/components/Button';
import Link from 'src/common/components/Link';
import useHostClassNav from 'src/pages/HostClass/hooks/useHostClassNav';

// TOTEST
const Navigation: React.FunctionComponent = () => {
  const { previous, next } = useHostClassNav();
  return (
    <Grid container justify="space-between">
      <Grid item xs={4} alignContent="flex-start">
        {previous && (
          <Link to={previous}>
            <Button>Previous</Button>
          </Link>
        )}
      </Grid>
      <Grid item xs={4} alignContent="flex-end">
        {next && (
          <Link to={next}>
            <Button href={next}>Next</Button>
          </Link>
        )}

        {!next && <Button type="submit">Submit</Button>}
      </Grid>
    </Grid>
  );
};

export default Navigation;
