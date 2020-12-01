import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';

const Cross = () => (
  <svg
    width='20px'
    height='20px'
    viewBox='0 0 279 279'
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
  >
    <title>✕</title>
    <g
      id='Instagram'
      stroke='none'
      stroke-width='1'
      fill='none'
      fill-rule='evenodd'
    >
      <polygon
        id='✕'
        fill='#FFFFFF'
        fill-rule='nonzero'
        points='256.032552 279 278.49349 256.539062 161.696615 139.742188 278.49349 22.9453125 256.032552 0.6796875 139.235677 117.476562 22.4388021 0.6796875 0.173177083 22.9453125 116.970052 139.742188 0.173177083 256.539062 22.4388021 279 139.235677 162.203125'
      ></polygon>
    </g>
  </svg>
);

const StyledNav = styled.nav`
  background: ${(props) => props.theme.blue};
  z-index: 15;

  * {
    color: ${(props) => props.theme.white};
  }
`;

const Nav = ({ exit }) => (
  <StyledNav className='d-flex justify-content-between align-items-center position-fixed w-100 fixed-top p-2 px-md-3 py-md-2'>
    <a
      href='https://creativecomputing.cci.arts.ac.uk/'
      className='d-none d-sm-block'
    >
      <Logo />
    </a>

    <a href='/'>
      <p className='mb-0'>MSc Creative Computing Graduates</p>
    </a>

    {exit && (
      <Link
        to='https://creativecomputing.cci.arts.ac.uk/'
        className='d-block d-md-none mb-0 ml-0 ml-1'
      >
        {Cross}
      </Link>
    )}
  </StyledNav>
);

export default Nav;
