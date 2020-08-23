import React, { memo } from 'react';
import { Box, CircularProgress, CircularProgressProps, Typography } from '@material-ui/core';

interface CircularProgressWithLabelProps extends CircularProgressProps {
  value: number;
}

const CircularProgressWithLabel: React.FC<CircularProgressWithLabelProps> = ({value,}) => {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="static" color="primary" value={value}/>
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