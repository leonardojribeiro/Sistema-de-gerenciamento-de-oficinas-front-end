import React from 'react';
import { Card, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

// import { Container } from './styles';

function Cartao() {
  return (
    <Card>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={8}>
          <Skeleton variant='text' width={200} height={48} />
        </Grid>
        <Grid item xs={4}>
          <Skeleton variant='circle' width={48} height={48} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant='rect' height={200} />
        </Grid>
      </Grid>
    </Card>
  );
}

export default Cartao;