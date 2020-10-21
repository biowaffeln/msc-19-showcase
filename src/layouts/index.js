import React from 'react';
import './fonts.css';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Header from '../components/header';

const theme = {
  blue: '#2500E5',
  white: '#FAF9F9',
  orange: 'rgba(255,118,44,0.99)',
  strokeWeight: '1px',
  borderRadius: '0.5rem',
};

const GlobalStyle = createGlobalStyle`
::selection {
  color: ${(props) => props.theme.blue};
  background: ${(props) => props.theme.orange};
  opacity: 1;
}


  body {
      background: ${(props) => props.theme.white};
      color: ${(props) => props.theme.blue};

         font-family: "Suisse Intl", -apple-system, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;  
    font-feature-settings: 'kern';
      text-rendering: geometricPrecision;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      font-feature-settings: 'ss01';
  }

  a {
      color: ${(props) => props.theme.blue};
      text-decoration: none;
  }

  a:hover {
      opacity: 0.5;
      text-decoration: none;
  }

  h1 {
      letter-spacing: -0.25rem;
      line-height: 0.9;
      font-weight: 900;
      font-size: 6vw; 


      @media only screen and (max-width: 1300px) {
        letter-spacing: -0.4vw;
        font-size: 10vw; 
      }
  }

  h2 {
      line-height: 1.2;
      font-size: 1.5rem;

      @media only screen and (max-width: 600px) {
        font-size: 4.5vw; 
      }
  }

  h3, h4, h5, h6 {
    font-size: 1.4rem;
    font-weight: 800;
  }

  p {
        font-size: 1.2rem;
        font-weight: 500;
        line-height: 1.2;

        @media only screen and (max-width: 1300px) {
        font-size: 1rem; 
      }
  }

  figcaption {
    font-size: 1.2rem;
    padding-top: 0.2rem;
    font-family: "Suisse Condensed";
  }

  blockquote {
    padding-left: 2rem;
  }
`;

const Layout = ({ children }) => (
  <div className='m-2 m-md-3'>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <main>{children}</main>
    </ThemeProvider>
  </div>
);

export default Layout;
