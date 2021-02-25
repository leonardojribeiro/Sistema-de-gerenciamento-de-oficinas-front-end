import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

interface CircularProgressWithLabelProps extends CircularProgressProps {
  value: number;
}

function CircularProgressWithLabel({ value, }: CircularProgressWithLabelProps): JSX.Element {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" color="primary" value={value} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="body2" component="div" color="textSecondary">{`${Math.round(
          value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default memo(CircularProgressWithLabel);