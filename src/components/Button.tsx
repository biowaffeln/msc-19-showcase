import styled from 'styled-components';
import React from 'react';

const Wrapper = styled.div`
  background: ${(props) => props.theme.blue};
  color: ${(props) => props.theme.white};
  display: inline-flex;

  &:hover {
    opacity: 0.8;
  }
`;

const Button = ({ children }) => (
  <Wrapper className='px-2 py-1'>{children}</Wrapper>
);

export default Button;
