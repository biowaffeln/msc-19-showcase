import styled from "styled-components";
import React, { useEffect, useRef } from "react";

const Wrapper = styled.div`
  background: ${(props) => props.theme.orange};
  color: ${(props) => props.theme.white};
  display: none;
  justify-content: center;
  align-items: center;
  height: 120px;
  width: 120px;
  border-radius: 10rem;
  position: fixed;
  text-align: center;
`;

const Sticker = ({ children }) => {
  const ref = useRef();

  function calcRandPos(ceil) {
    return Math.floor(Math.random() * ceil);
  }

  useEffect(() => {
    const x = calcRandPos(window.innerWidth - 200);
    const y = calcRandPos(window.innerHeight - 200);

    ref.current.style.top = `${y}px`;
    ref.current.style.left = `${x}px`;
    ref.current.style.display = `flex`;
  }, []);

  return (
    <Wrapper ref={ref} className="p-5">
      {children}
    </Wrapper>
  );
};

export default Sticker;
