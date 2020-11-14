import React, { useState, useEffect, useContext } from "react";
import { Context } from "./introContext";
import styled from "styled-components";
import Animation from "./animation.js";
import * as arrow from "./arrow.svg";

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

const Arrow = styled.h2`
  animation-name: wiggle-anim;
  animation-duration: 2s;
  animation-iteration-count: infinite;

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
    return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      let opc = map(window.scrollY, 0, window.innerHeight * 0.5, 1, 0);
      opc = Math.round((opc + Number.EPSILON) * 100) / 100;

      setOpacity(opc);
      if (opc <= 0) context.setActive(false);
    });
  });

  if (context.active) {
    return (
      <>
        <Wrapper
          className="d-flex justify-content-center align-items-center"
          style={{ opacity: opacity }}
        >
          <Animation />
          <h1 className="text-center mx-5">MSc Creative Computing Graduates</h1>
          <Arrow className="p-fixed fixed-bottom mx-auto text-center">
            {arrow}
          </Arrow>
        </Wrapper>
      </>
    );
  }

  return null;
};

export default Intro;
