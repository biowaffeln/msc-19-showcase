import React from 'react';
import styled from 'styled-components';
import { Instagram, Twitter, Youtube } from './Icons';
import Logo from './Logo';

const StyledFooter = styled.footer`
  background: ${(props) => props.theme.blue};
  color: ${(props) => props.theme.white};

  svg {
    fill: ${(props) => props.theme.white};
  }
`;

const Footer = () => (
  <StyledFooter className='d-sm-none p-2 d-flex justify-content-between align-items-center'>
    <Logo />

    <div className='d-flex ml-3'>
      <a
        href='https://www.youtube.com/channel/UCtj43Vmw85ghSncJHW1xBVA'
        className='pr-2'
      >
        <Youtube />
      </a>
      <a
        href='https://twitter.com/ual_cci?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor'
        className='pr-2'
      >
        <Twitter />
      </a>
      <a href='https://www.instagram.com/ual_cci/?hl=en'>
        <Instagram />
      </a>
    </div>
  </StyledFooter>
);

export default Footer;
