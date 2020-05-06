import React from 'react';
import { Grid, Box, InputLabel, Button, makeStyles } from '@material-ui/core';
import { memo } from 'react';

const useStyles = makeStyles({
  imagem: {
    maxWidth: "80%",
    maxHeight: "192px"
  },
  input: {
    display: "none",
  }
});

function SeletorImagem({ urlImagem, onChange }) {
  const classes = useStyles();

  const containerImagem = (
    <Box m={2} p={2} border={1} display="flex" justifyContent="center" alignItems="center">
      <img className={classes.imagem} src={urlImagem} alt="Prévia" />
    </Box>
  );

  return (
    <Grid container>
      <Grid xs={12} item>
        <Box p={2}>
          <InputLabel htmlFor="logomarca" >
            <Button fullWidth variant="outlined" component="span">
              Selecione a logomarca
            </Button>
          </InputLabel>
          <input
            type="file"
            className={classes.input}
            id="logomarca"
            onChange={e=>onChange(e.target.files)}
            accept="image/*"
          />
        </Box>
      </Grid>
      <Grid xs={12} item>
        {
          urlImagem && containerImagem
        }
      </Grid>
    </Grid>
  );
}

export default memo(SeletorImagem);