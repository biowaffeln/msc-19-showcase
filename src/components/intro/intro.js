import React, { useContext, useLayoutEffect } from 'react';
import { animated, config, useSpring, useTransition } from 'react-spring';
import styled from 'styled-components';
import Animation from './animation.js';
import * as arrow from './arrow.svg';
import { Context } from './introContext';

const Wrapper = styled(animated.div)`
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

  const transitions = useTransition(context.active, null, {
    from: { opacity: 1 },
    leave: { opacity: 0 },
  });

  useLayoutEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY !== 0) context.setActive(false);
    });
  });

  const textFade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config.molasses,
  });

  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <Wrapper
          key={key}
          style={props}
          className='d-flex justify-content-center align-items-center'
          id='lottie'
        >
          <Animation />

          <animated.div style={textFade}>
            <h1 className='text-center mx-5' style={textFade}>
              MSc Creative Computing Graduates
            </h1>
            <Arrow className='p-fixed fixed-bottom mx-auto text-center p-2 p-md-3'>
              <img src={arrow} alt='Scroll Down' />
            </Arrow>
          </animated.div>
        </Wrapper>
      )
  );
};

export default Intro;
