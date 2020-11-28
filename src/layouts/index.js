import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Footer from '../components/footer';
import Nav from '../components/nav';
import SocialLinks from '../components/socialLinks';
import './custom.scss';
import './fonts.css';

const theme = {
  white: '#FFFFFF',
  grey: '#F8F7F5',
  black: '#000000',
  blue: '#3E01FF',
};

const typeBase = `
  font-feature-settings:"kern" 1;
  font-kerning: normal;
  -webkit-font-smoothing: antialiased; /* Chrome, Safari */
  -moz-osx-font-smoothing: grayscale; /* Firefox */
`;

const helvetica = `"Suisse Intl", "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif`;
const pressura = `"GT Pressura", "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif`;

const GlobalStyle = createGlobalStyle`
  ::selection {
    color: ${(props) => props.theme.black};
    background: ${(props) => props.theme.blue};
  }

  body {
      background: ${(props) => props.theme.grey};
      color: ${(props) => props.theme.black};

      font-feature-settings: 'kern';
      text-rendering: geometricPrecision;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
  }

  a {
    ${typeBase}
      color: ${(props) => props.theme.black};
      text-decoration: none;
      transition: 0.2s ease-in color;
  }

  a:hover {
    color: ${(props) => props.theme.blue};
      text-decoration: none;
      transition: 0.2s ease color;
  }

  h1 {
    ${typeBase}
    font-family: ${helvetica};
      letter-spacing: -0.05rem;
      line-height: 1;
      font-weight: 800;
      font-size: 5.3125rem;  

      @media (max-width: 768px) { 
        font-size: 40px;  
        letter-spacing: -0.01rem;
       }
  }

  h2 {
    ${typeBase}
    font-family: ${helvetica};
      line-height: 1.2;
      font-size: 4.375rem;
      font-weight: 800;

      @media (max-width: 768px) { 
        font-size: 40px;  
       }
  }

  h3 {
    ${typeBase}
    font-family: ${pressura};
    font-size: 1.875rem;
    font-weight: 300;

    @media (max-width: 768px) { 
        font-size: 20px;  
       }
  }

  h4 {
    ${typeBase}
    font-family: ${helvetica};
    font-weight: 800;
    font-weight: 1.25rem;

    @media (max-width: 768px) { 
      font-size: 20px;  
    }
  }

  p {
    ${typeBase}
    font-family: ${helvetica};
    letter-spacing: 0.015em;
    word-spacing: 0.001em;
    font-size: 1.125rem;
    font-weight: 500;
    line-height: 1.45;

    @media (max-width: 768px) { 
      font-size: 16px;  
    }
  }

  figcaption {
    ${typeBase}
    font-size: 1.2rem;
    padding-top: 0.2rem;
    font-family: ${pressura};
    font-weight: 300;

    @media (max-width: 768px) { 
        font-size: 0.9rem; 
       }
  }

  blockquote p {
    ${typeBase}
    font-size: 1.875rem;
    padding-left: 2rem;
    font-family: ${helvetica};
    font-weight: 800;

    @media (max-width: 768px) { 
        font-size: 20px;  
       }
  }
`;

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <div className='mx-2 mx-md-3 my-5 my-md-6'>
      <GlobalStyle />
      <Nav />
      <main>{children}</main>
      <SocialLinks />
    </div>
    <Footer />
  </ThemeProvider>
);

export default Layout;
