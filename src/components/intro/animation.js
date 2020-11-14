import * as animData from './anim.json';
import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
`;

const Animation = () => {
  let animContainer = useRef();

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animContainer.current,
      animationData: animData.default,
      renderer: 'svg',
      loop: true,
      autoplay: true,
    });
    return () => anim.destroy();
  }, []);

  return <Wrapper ref={animContainer} />;
};

export default Animation;
