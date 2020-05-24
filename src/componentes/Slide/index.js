import React, { memo, useState, useEffect } from 'react';
import { Box} from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Button from "../../componentes/Button";
import './style.css';
import { Link } from 'react-router-dom';


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const slides = [
  {
    url: "https://quatrorodas.abril.com.br/wp-content/uploads/2019/08/mustang-shelby-gt500-2020-10-e1565155986301.jpg",
    titulo: "Bem vindo ao Sistema de Gerenciamento de Oficinas!",
    botao: {
      titulo: "Solicitar Cadastro",
      link: "/oficina/cadastro",
      tooltip: "Solicitar o Cadastro de uma Oficina Candidata"
    }
  }
]

function Slide() {
  const [slideAtivo, setSlideAtivo] = useState(0);

  const handleChangeIndex = index => setSlideAtivo(index);

  return (
    <>
      <div className="slider">
        <AutoPlaySwipeableViews autoplay={true} enableMouseEvents index={slideAtivo} onChangeIndex={handleChangeIndex}>
          {slides.map((slide, index) => {
            const ativo = index === slideAtivo ? "slide-ativo" : "";
            return (
              <div key={index} className="slide">
                <img className={`slide-imagem ${ativo}`} src={slide.url} alt="" />
                <Box className="slide-corpo">
                  <h2 className={`slide-titulo ${ativo}`}>{slide.titulo}</h2>
                  {slide.botao && (
                    <Button tooltip={slide.botao.tooltip} component={Link} to={slide.botao.link} onClick={()=>{}}>
                      {slide.botao.titulo}
                    </Button>
                  )}
                </Box>
              </div>
            )
          })}
        </AutoPlaySwipeableViews>
        <div className="pontos">
          {slides.length > 1 && slides.map((_, index) => {
            const ativo = index === slideAtivo ? "ponto-ativo" : "";
            return (
              <div key={index} className={`ponto ${ativo}`} onClick={() => handleChangeIndex(index)} />
            )
          })}
        </div>
      </div>
    </>
  );
}

export default memo(Slide);