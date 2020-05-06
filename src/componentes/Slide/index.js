import React, { useCallback } from 'react';
import { Container } from '@material-ui/core';

//import './style.css';

const slides = [
  {
    url: "https://picstatio.com/large/8d2bb7/front-Mercedes-AMG-GT-outdoor.jpg",
    titulo: "Titulo 1",
  },
  {
    url: "https://picstatio.com/large/8d2bb7/front-Mercedes-AMG-GT-outdoor.jpg",
    titulo: "Titulo 2",
  },
  {
    url: "https://picstatio.com/large/8d2bb7/front-Mercedes-AMG-GT-outdoor.jpg",
    titulo: "Titulo 3",
  },
]

export default function Slide() {
  return (
    <Container>
      <b duration={200} >
        {
          slides.map((slide, index)=>(
            <div key={index}>
              <h2>{slide.titulo}</h2>
              <img src={slide.url} alt=""/>
            </div>
          ))
        }
      </b>
    </Container>
  );
}
