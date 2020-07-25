import React, { memo, useState, } from 'react';
import { Box, Button } from '@material-ui/core';
import './style.css';
import { Link } from 'react-router-dom';
import useInterval from '../../hooks/useInterval';



const slides = [
  {
    url: "https://quatrorodas.abril.com.br/wp-content/uploads/2019/08/mustang-shelby-gt500-2020-10-e1565155986301.jpg?quality=50",
    titulo: "Bem vindo ao Sistema de Gerenciamento de Oficinas!",
  },
  {
    url: "https://media.gazetadopovo.com.br/2017/05/786ef112940f19d8e553e846a443ab30-gpMedium.jpg",
    titulo: "A solução ideal para a sua oficina.",
  },
]

function Slide() {
  const [slideAtivo, setSlideAtivo] = useState(0);

  useInterval(() => {
    setSlideAtivo(slideAtivo < slides.length - 1 ? slideAtivo + 1 : 0);
  }, 4000);

  return (
    <div className="slider">
      {
        slides.map((slide, key) => {
          const ativo = key === slideAtivo ? "ativo" : "";
          return (
            <div key={key} className={`slide ${ativo}`}>
              <Box className="slide-corpo">
                <h2 className={`slide-titulo`}>{slide.titulo}</h2>
                {slide.botao && (
                  <Button tooltip={slide.botao.tooltip} component={Link} to={slide.botao.link} onClick={() => { }}>
                    {slide.botao.titulo}
                  </Button>
                )}
              </Box>
              <img className={`slide-imagem `} src={slide.url} alt="" />
            </div>
          )
        })
      }

    </div>
  );
}

export default memo(Slide);