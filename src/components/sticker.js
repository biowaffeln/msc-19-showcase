import styled from 'styled-components';
import React, { useEffect, useRef } from 'react';
import { useSpring, animated, config } from 'react-spring';

const Wrapper = styled(animated.div)`
  background: ${(props) => props.theme.orange};
  color: ${(props) => props.theme.white};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100px;
  border-radius: 10rem;
  position: absolute;
  text-align: center;
  z-index: 100;
  font-size: 1rem;
  font-feature-settings: 'ss01';
`;

const Sticker = ({ children }) => {
  const fadein = useSpring({
    from: { transform: 'scale(0)' },
    to: { transform: 'scale(1)' },
    delay: Math.floor(Math.random() * 500),
    config: config.wobbly,
  });

  const ref = useRef();

  function calcRandPos(ceil) {
    return Math.floor(Math.random() * ceil);
  }

  useEffect(() => {
    const x = calcRandPos(window.innerWidth - 200);
    const y = calcRandPos(window.innerHeight - 200);

    ref.current.style.top = `${y}px`;
    ref.current.style.left = `${x}px`;
  }, []);

  return (
    <Wrapper ref={ref} className='p-5' style={fadein}>
      {children}
    </Wrapper>
  );
};

export default Sticker;
