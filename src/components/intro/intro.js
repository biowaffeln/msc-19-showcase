import React, { useState, useEffect, useContext } from 'react';
import { Context } from './introContext';
import styled from 'styled-components';
import Animation from './animation.js';
import * as arrow from './arrow.svg';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 20;
  background: ${(props) => props.theme.blue};
  color: ${(props) => props.theme.white};

  h1 {
    max-width: 20ch;
  }
`;

const Arrow = styled.div`
  animation-name: wiggle-anim;
  animation-duration: 2s;
  animation-iteration-count: infinite;

  img {
    height: 3rem;
    width: auto;
  }

  @keyframes wiggle-anim {
    0% {
      transform: translateY(-1.5rem);
    }
    50% {
      transform: translateY(0rem);
    }
    100% {
      transform: translateY(-1.5rem);
    }
  }
`;

const Intro = () => {
  const context = useContext(Context);

  const [opacity, setOpacity] = useState(1);

  function map(n, start1, stop1, start2, stop2) {
    let val = ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
    val = Math.round((val + Number.EPSILON) * 100) / 100;
    return val;
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      let opc = map(window.scrollY, 0, window.innerHeight * 0.5, 1, 0);
      setOpacity(opc);

      if (opc <= 0) {
        context.setActive(false);
      }
    });
  });

  if (context.active) {
    return (
      <>
        <Wrapper
          className='d-flex justify-content-center align-items-center'
          style={{ opacity: opacity }}
        >
          <Animation />
          <h1 className='text-center mx-5'>MSc Creative Computing Graduates</h1>
          <Arrow className='p-fixed fixed-bottom mx-auto text-center p-4'>
            <img src={arrow} alt='Scroll Down' />
          </Arrow>
        </Wrapper>
      </>
    );
  }

  return null;
};

export default Intro;
