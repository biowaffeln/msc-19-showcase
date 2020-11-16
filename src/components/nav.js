import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Logo from './logo';

const StyledNav = styled.nav`
  background: ${(props) => props.theme.blue};
  z-index: 15;

  * {
    color: ${(props) => props.theme.white};
  }
`;

const Nav = () => (
  <StyledNav className='d-flex justify-content-between align-items-center position-fixed w-100 fixed-top p-2 p-md-3'>
    <Link to='/' className='d-none d-sm-block'>
      <Logo />
    </Link>

    <h3 className='mb-0'>MSc Creative Computing Graduates</h3>

    <Link to='/' className='d-block d-md-none mb-0'>
      ✕
    </Link>
  </StyledNav>
);

export default Nav;
