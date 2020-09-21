import { makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import React from 'react';
import { motion, useTransform, useViewportScroll, } from "framer-motion";
import Sticky from '../Sticky';
import desktop from '../../../Assets/Images/desktop.png';
import mobile from '../../../Assets/Images/mobile.png';
import tablet from '../../../Assets/Images/tablet.png';
import marcaueg from '../../../Assets/Images/marcaueg.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "2000vh",
    position: "initial",
    background: theme.palette.background.default,
  },
  section: {
    position: "relative",
  },
  flexFull: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100%",
  },
  img: {
    maxWidth: `calc(100% - ${theme.spacing(2) * 2}px)`,
    maxHeight: `calc(100vh - ${theme.spacing(4) * 2}px)`,
    padding: theme.spacing(2),
  },
  absoluteFlexFull: {
    top: 0,
    height: "100vh",
    width: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  legend: {
    position: "absolute",
    background: theme.palette.background.default,
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    maxWidth: "192px",
  },
  frame: {
    position: "absolute",
    height: "100vh",
    width: "100%",
    border: `2px solid ${theme.palette.text.primary}`,
    zIndex: theme.zIndex.modal,
  },
}));


const Funcionalidades: React.FC = () => {
  const classes = useStyles();
  const { scrollYProgress } = useViewportScroll();

  const legendFunctionsTitleOpacity = useTransform(
    scrollYProgress,
    [0.45, 0.46],
    [0, 1]
  );

  return (
    <>
      <div className={classes.absoluteFlexFull}>
        <motion.div
          className={classes.legend}
          style={{
            opacity: legendFunctionsTitleOpacity,
            maxWidth: "500px",
            marginTop: '-5vh'
          }}
        >
          <Typography align="justify" variant="h4"  >Principais funcionalidades</Typography>
        </motion.div>
      </div>
    </>
  )
}


const Anim: React.FC = () => {
  const classes = useStyles();
  const smallSize = useMediaQuery(useTheme().breakpoints.down('sm'))
  console.log(smallSize)
  const { scrollYProgress } = useViewportScroll();
  const opacityTitle = useTransform(
    scrollYProgress,
    [0, 0.02, 0.05, 0.07],
    [0.9, 1, 1, 0]
  );
  const opacitySubTitle = useTransform(
    scrollYProgress,
    [0.07, 0.09, 0.13, 0.15],
    [0, 1, 1, 0]
  );

  const frameScale = useTransform(
    scrollYProgress,
    [0.15, 0.17],
    [0.5, 0.97, ]
  )
  const frameOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.16, 0.17, 0.25],
    [0, 1, 1, 0]
  )
  const frameBorderRadius = useTransform(
    scrollYProgress,
    [0.15, 0.17, 0.19],
    ['35px', '0px', '5px']
  )


  const marginLeftSlide = useTransform(
    scrollYProgress,
    smallSize
      ? [0.15, 0.17, 0.23, 0.27, 0.33, 0.37, 0.45]
      : [0.15, 0.17, 0.23, 0.27, 0.33, 0.37, 0.43, 0.45],
    smallSize
      ? ['100%', '0%', '0%', '-100%', '-100%', '-200%', '-400%']
      : ['100%', '0%', '0%', '-100%', '-100%', '-200%', '-200%', '-300%']
  );

  const imgMobileOpacity = useTransform(
    scrollYProgress,
    [0.16, 0.17, 0.23, 0.24,],
    [0, 1, 1, 0,]
  );
  const imgTabeletOpacity = useTransform(
    scrollYProgress,
    [0.26, 0.27, 0.33, 0.34,],
    [0, 1, 1, 0,]
  );
  const imgDesktopOpacity = useTransform(
    scrollYProgress,
    [0.36, 0.37, 0.43, 0.44,],
    [0, 1, 1, 0,]
  );

  const legendResponsiveOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.17, 0.43, 0.45,],
    [0, 0.8, 0.8, 0,]
  );
  const legendResponsiveTop = useTransform(
    scrollYProgress,
    [0.13, 0.15, 0.45],
    ['80%', '30%', '0%']
  );

  const legendSmallOpacity = useTransform(
    scrollYProgress,
    [0.17, 0.19, 0.21, 0.23,],
    [0, 0.8, 0.8, 0,]
  );
  const legendSmallTop = useTransform(
    scrollYProgress,
    [0.17, 0.19, 0.25],
    ['100%', '50%', '50%']
  );

  const legendMediumOpacity = useTransform(
    scrollYProgress,
    [0.27, 0.29, 0.31, 0.33,],
    [0, 0.8, 0.8, 0,]
  );

  const legendLargeOpacity = useTransform(
    scrollYProgress,
    [0.37, 0.39, 0.41, 0.43,],
    [0, 0.8, 0.8, 0,]
  );
  const legendLargeMarginLeft = useTransform(
    scrollYProgress,
    [0.41, 0.45],
    ['0%', '-150%']
  );



  return (
    <div className={classes.root} >
      <div className={classes.section} style={{ height: '95%' }}>
        <Sticky>
          <div className={classes.absoluteFlexFull}>
            <motion.div
              className={classes.frame}
              style={{
                scale: frameScale,
                opacity: frameOpacity,
                borderRadius: frameBorderRadius,
              }}
            />
          </div>
          <motion.div className={classes.flexFull} style={{
            height: "100vh",
            width: "100%",
            opacity: opacityTitle
          }}>
            <Typography align={"center"} variant="h1">Bem-vindo ao GOAuto!</Typography>
          </motion.div>
          <motion.div className={classes.flexFull} style={{
            top: 0,
            opacity: opacitySubTitle,
            position: "absolute"
          }}>
            <Typography align="center" variant="h2">A solução ideal para a sua oficina.</Typography>
          </motion.div>
          <motion.div
            className={classes.absoluteFlexFull}
            style={{
              width: smallSize ? "400%" : "300%",
              marginLeft: marginLeftSlide,
            }}
          >
            <div className={classes.flexFull}>
              <motion.div
                style={{
                  opacity: imgMobileOpacity
                }}
              >
                <img src={mobile} alt="mobile" className={classes.img}
                />
              </motion.div>
            </div>
            <div className={classes.flexFull}>
              <motion.div
                style={{
                  opacity: imgTabeletOpacity
                }}
              >
                <img src={tablet} alt="tablet" className={classes.img}
                />
              </motion.div>
            </div>
            <div
              className={classes.flexFull}
              style={{
                width: smallSize ? "200%" : "100%"
              }}
            >
              <motion.div
                style={{
                  opacity: imgDesktopOpacity,
                }}
              >
                <img src={desktop} alt="desktop" className={classes.img}
                />
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            className={classes.legend}
            style={{
              top: legendResponsiveTop,
              opacity: legendResponsiveOpacity,
              marginLeft: "10%"
            }}
          >
            <Typography align="justify" variant="h5"  >O GoAuto é capaz de se adequar em qualquer largura de tela.</Typography>
          </motion.div>
          <div className={classes.absoluteFlexFull}>
            <motion.div
              className={classes.legend}
              style={{
                top: legendSmallTop,
                opacity: legendSmallOpacity,
              }}
            >
              <Typography align="justify" variant="h5"  >Seja pequena</Typography>
            </motion.div>
          </div>
          <div className={classes.absoluteFlexFull}>
            <motion.div
              className={classes.legend}
              style={{
                opacity: legendMediumOpacity,
              }}
            >
              <Typography align="justify" variant="h5"  >Média</Typography>
            </motion.div>
          </div>
          <div className={classes.absoluteFlexFull}>
            <motion.div
              className={classes.legend}
              style={{
                marginLeft: legendLargeMarginLeft,
                opacity: legendLargeOpacity,
              }}
            >
              <Typography align="justify" variant="h5"  >Ou larga.</Typography>
            </motion.div>
          </div>
          <Funcionalidades />
          
        </Sticky>
      </div>
    </div>
  );

}

export default Anim;