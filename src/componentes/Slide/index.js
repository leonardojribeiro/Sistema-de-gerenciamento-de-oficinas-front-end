import React from 'react';
import { Container } from '@material-ui/core';

// import { Container } from './styles';

export default function Slide() {
  const slides = document.querySelectorAll("#slide");
  console.log(slides);

  return (
    <Container>
      <div id="slide" >
        
      </div>
    </Container>
  );
}
