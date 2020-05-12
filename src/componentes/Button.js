import React, { memo } from 'react';
import { Button, makeStyles, Tooltip } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    color: "inherit",
    backgroundColor: "var(--cor-transparente)",
    border: "1px solid var(--cor-borda)",
    '&:hover': {
      border: "1px solid var(--cor-borda-after)",
      backgroundColor: "var(--cor-transparente)",
    }
  }
});

function CustomButton({ tooltip, children, ...props }) {
  const classes = useStyles();
  return (
    <>
      {
        tooltip && (
          <Tooltip arrow title={tooltip}>
            <Button className={classes.root} {...props}>
              {children}
            </Button>
          </Tooltip>
        ) || (
          <Button className={classes.root} {...props}>
            {children}
          </Button>
        )
      }
    </>
  );
}

export default memo(CustomButton);