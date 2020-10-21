import styled from "styled-components";
import React from "react";

const Wrapper = styled.div`
  border: 1px solid ${(props) => props.theme.blue};
  display: inline-flex;
  border-radius: 1rem;

  &:hover {
    background: ${(props) => props.theme.blue};
    color: ${(props) => props.theme.white};
  }
`;

const Button = ({ children }) => (
  <Wrapper className="px-3 py-1">{children}</Wrapper>
);

export default Button;
