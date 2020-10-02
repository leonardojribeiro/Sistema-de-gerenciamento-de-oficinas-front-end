import React, { forwardRef, useImperativeHandle, useState, memo } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
//import { motion } from 'framer-motion';

export interface ProgressoCircularHandles {
  setValor: React.Dispatch<React.SetStateAction<number>>,
  setAberto: React.Dispatch<React.SetStateAction<boolean>>,
}

const useStyles = makeStyles((theme) => 
{
  console.log(theme
    )
  return({
  backdrop: {
    zIndex: theme.zIndex.modal + 1,
  },
  b: {
     

  }

})});



// const Teste: React.FC = () => {
//   let v = document.getElementById('root');

//   if(v){
//     v.style.overflow = 'hidden';
//   }
  

//   const classes = useStyles();
//   return (
//     <motion.div className={classes.b}>

//     </motion.div>
//   )
// }


const ProgressoCircular = forwardRef<ProgressoCircularHandles | undefined>((props, ref) => {
  const classes = useStyles();

  const [aberto, setAberto] = useState<boolean>(false);
  const [valor, setValor] = useState<number>(0);
  console.log('black')

  useImperativeHandle(ref, () => ({
    setValor,
    setAberto,
  }));
  // return (
  //   <Teste />
  // )

  return (

    <>
      { <Backdrop className={classes.backdrop} open={aberto} >
        <CircularProgress variant={valor > 0 ? "static" : "indeterminate"} value={valor} />
      </Backdrop >  }
    </>
  )
});

export default memo(ProgressoCircular);