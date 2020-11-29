import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Canvas from './Canvas';

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
  user-select: none;
`;

const Jumbo = () => {
  const wrapper = useRef(null);

  function handleScroll() {
    if (wrapper.current) {
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
      </HoverWrapper>
    </>
  );
};

export default Jumbo;
