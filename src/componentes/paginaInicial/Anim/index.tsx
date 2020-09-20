import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { motion, useTransform, useViewportScroll, } from "framer-motion";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "2000vh",
    position: "initial",
  },
  sticky: {
    height: "100vh",
    position: "sticky",
    top: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
  },
  section: {
    position: "relative",
  },
  first: {
    background: theme.palette.background.default,

  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    height: "100vh",
    width: "100%",
  },
  containerFull: {
    top: 0,
    height: "100vh",
    width: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  }
}));



const Anim: React.FC = () => {
  const classes = useStyles();
  const { scrollYProgress } = useViewportScroll();
  const r = useTransform(scrollYProgress, [0, 0.03, 0.055], [0.8, 1, 0]);
  const s = useTransform(scrollYProgress, [0.055, 0.06, 0.09, 0.105], [0, 1, 1, 0]);
  const t = useTransform(scrollYProgress, [0.105, 0.11], [0, 1]);
  const m = useTransform(scrollYProgress, [0.15, 0.17, 0.21, 0.24 ], ['0%', '-100%', '-100%', '-200%']);
  return (
    <div className={classes.root} >
      <div className={classes.section} style={{ height: '90%' }}>
        <motion.div className={classes.sticky}>

          <motion.div className={classes.first} style={{

            left: 0,
            right: 0,
            height: "100vh",
          }}>
            <motion.div className={classes.sticky}>
              <motion.div className={classes.title} style={{
                height: "100vh",
                width: "100%",
                opacity: r
              }}>
                <Typography variant="h1">Bem-vindo ao GOAuto!</Typography>
              </motion.div>
              <motion.div className={classes.title} style={{
                top: 0,
                height: "100vh",
                width: "100%",
                opacity: s,
                position: "absolute"
              }}>
                <Typography variant="h2">A solução ideal para a sua oficina.</Typography>
              </motion.div>
              <motion.div
                className={classes.containerFull}
                style={{
                  opacity: t,
                  width: "300%",
                  marginLeft:  m ,
                }}
              >
                <div className={classes.title}>
                  <div style={{
                    width: "100%",
                    height: "40vh",
                    background: "#ff0000",
                  }}> </div>
                  <div style={{
                    width: "100%",
                    height: "40vh",
                    background: "#00ff00",
                  }}> </div>
                  <div style={{
                    width: "100%",
                    height: "40vh",
                    background: "#0000ff",
                  }}> </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );

}

export default Anim;