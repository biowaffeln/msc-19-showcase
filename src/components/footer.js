import React from 'react';
import Logo from './logo';
import styled from 'styled-components';
import { Instagram, Twitter, Youtube } from './icons';

const StyledFooter = styled.footer`
  background: ${(props) => props.theme.blue};
  color: ${(props) => props.theme.white};

  svg {
    fill: ${(props) => props.theme.white};
  }
`;

const Footer = () => (
  <StyledFooter className='d-sm-none p-2 d-flex justify-content-between align-items-center'>
    <a href='https://www.arts.ac.uk/creative-computing-institute'>
      <Logo />
    </a>
    <a href='https://www.youtube.com/channel/UCtj43Vmw85ghSncJHW1xBVA'>
      <Youtube />
    </a>
    <a href='https://twitter.com/ual_cci?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor'>
      <Twitter />
    </a>
    <a href='https://www.instagram.com/ual_cci/?hl=en'>
      <Instagram />
    </a>
  </StyledFooter>
);

export default Footer;
