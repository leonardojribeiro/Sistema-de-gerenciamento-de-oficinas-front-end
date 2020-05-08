import React, { memo, useState } from 'react';
import { Container } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import './style.css';


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const slides = [
  {
    url: "https://picstatio.com/large/8d2bb7/front-Mercedes-AMG-GT-outdoor.jpg",
    titulo: "Titulo 1 ",
  },
  {
    url: "https://picstatio.com/large/8d2bb7/front-Mercedes-AMG-GT-outdoor.jpg",
    titulo: "Titulo 2",
  },
  {
    url: "https://picstatio.com/large/8d2bb7/front-Mercedes-AMG-GT-outdoor.jpg",
    titulo: "Titulo 3 ",
  },
]

function Slide() {
  const [slideAtivo, setSlideAtivo] = useState(0);

  const handleChangeIndex = index => setSlideAtivo(index);

  return (
    <>
      <AutoPlaySwipeableViews autoplay={true} enableMouseEvents className="slider" index={slideAtivo} onChangeIndex={handleChangeIndex}>
        {
          slides.map((slide, index) => {
            const ativo = index === slideAtivo ? "ativo" : "";
            return (
                <div key={index} className={`slide`}>
                  <h2 className={`slide-titulo ${ativo}`}>{slide.titulo}</h2>
                  <img className="slide-imagem" src={slide.url} alt="" />
                </div>
            )
          })
        }
      </AutoPlaySwipeableViews>
    </>
  );
}

export default memo(Slide);