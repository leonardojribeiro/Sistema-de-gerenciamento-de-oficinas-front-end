import React from 'react';
import { Button, AppBar, Toolbar, Box, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Rodape from './Rodape';
import Anim from './Anim';
import { motion, useTransform, useViewportScroll } from 'framer-motion';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
  },
  main: {
    position: "relative",
  },
  appBarContainer:{
    position: "absolute",
    left: 0,
    right: 0,
  },
  appBar:{
    position: "fixed",
  }
}))

const PaginaInicial: React.FC = ({ ...props }) => {
  const classes = useStyles();
  const { scrollYProgress } = useViewportScroll();
  const appBarTop = useTransform(
    scrollYProgress,
    [0.03, 0.05],
    ['0%', '-64px'],
  )

  return (
    <main className={classes.main}>
      <motion.div
        className={classes.appBarContainer}
        style={{
          marginTop: appBarTop
        }}
      >
        <AppBar className={classes.appBar} position="relative">
          <Toolbar className={classes.toolbar} >
            <Button color="inherit" component={Link} to={"/login"}>Login</Button>
          </Toolbar>
        </AppBar>
      </motion.div>

      <Anim />
      <Rodape />
    </main>
  );
}

export default PaginaInicial;

/* <Element name="item">
<Box display="flex" className="h-min-barra" alignItems="center" justifyContent="center">
        <Slide />
      </Box>
        <Box className="h-total" display="flex" alignItems="center" >
          <Container maxWidth="md">
            <Box display="flex" justifyContent="center" p={2} pb={6}>
              <Typography variant="h1">Funcionalidades</Typography>
            </Box>
            <Grid container spacing={4} justify="center">
              {
                funcionalidades.map((funcionalidade, key) =>
                  <ItemFuncionalidade key={key} titulo={funcionalidade} descricao="Permite cadastrar, editar, visualizar..." />
                )
              }
            </Grid>
          </Container>
        </Box>
      </Element> */