import React, { memo, useEffect, useState } from 'react';
import { Box, CircularProgress, CircularProgressProps, Typography } from '@material-ui/core';

interface CircularProgressWithLabelProps extends CircularProgressProps {
  value: number;
}

function CircularProgressWithLabel({ value, }: CircularProgressWithLabelProps): JSX.Element {
  const [lblValue, setlblValue] = useState<number>(0);
  useEffect(() => {
    setTimeout(() => {
      setlblValue(value);
    }, 100)
  }, [value])
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" color="primary" value={lblValue} />
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