import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Canvas from './canvas';

const Spacer = styled.div`
  width: 100%;
  height: 65vh;
`;

const HoverWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 20;
  background: ${(props) => props.theme.blue};
  color: ${(props) => props.theme.white};

  h1 {
    max-width: 20ch;
  }
`;

const Title = styled.h1`
  pointer-events: none;
`;

const Arrow = styled.div`
  pointer-events: none;
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
  const wrapper = useRef(null);

  function handleScroll() {
    if (wrapper.current) {
      // wrapper.current.style.transform = `translateY(-${
      //   window.pageYOffset * 2
      // }px)`;
      wrapper.current.style.transform = `translate3d(0px, -${
        window.pageYOffset * 2
      }px, 0px)`;
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', () => handleScroll());
    return () => window.removeEventListener('scroll', () => handleScroll());
  }, []);

  return (
    <>
      <Spacer />

      <HoverWrapper
        className='d-flex justify-content-center align-items-center'
        ref={wrapper}
      >
        <Canvas />

        <Title className='text-center mx-5'>
          MSc Creative Computing Graduates
        </Title>

        {/* <Arrow className='p-fixed fixed-bottom mx-auto text-center p-2 p-md-3'>
          <img src={arrow} alt='Scroll Down' />
        </Arrow> */}
      </HoverWrapper>
    </>
  );
};

export default Intro;
