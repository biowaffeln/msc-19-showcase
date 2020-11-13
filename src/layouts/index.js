import React from "react";
import "./fonts.css";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Nav from "../components/nav";
import Footer from "../components/footer";
import SocialLinks from "../components/socialLinks";

const theme = {
  white: "#FFFFFF",
  grey: "#F8F7F5",
  black: "#000000",
  blue: "#0057FF",
};

const GlobalStyle = createGlobalStyle`
  ::selection {
    color: ${(props) => props.theme.black};
    background: ${(props) => props.theme.blue};
    opacity: 1;
  }

  body {
      background: ${(props) => props.theme.grey};
      color: ${(props) => props.theme.black};

      font-family: "Suisse Intl", sans-serif;  
      font-feature-settings: 'kern';
      text-rendering: geometricPrecision;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
  }

  a {
      color: ${(props) => props.theme.black};
      text-decoration: none;
      transition: 0.25s ease-in color;
  }

  a:hover {
    color: ${(props) => props.theme.blue};
      text-decoration: none;
      transition: 0.5s ease color;
  }

  h1 {
      letter-spacing: -0.1rem;
      line-height: 1;
      font-weight: 900;
      font-size: 5.3125rem;  

      @media (max-width: 768px) { 
        font-size: 40px;  
       }
  }

  h2 {
    font-family: "Suisse Intl";
      line-height: 1.2;
      font-size: 4.375rem;
      font-weight: 800;

      @media (max-width: 768px) { 
        font-size: 40px;  
       }
  }

  h3 {
    font-family: "GT Pressura";
    font-size: 1.875rem;
    font-weight: 300;

    @media (max-width: 768px) { 
        font-size: 20px;  
       }
  }

  h4 {
    font-family: "Suisse Intl";
    font-weight: 800;
    font-weight: 1.25rem;

    @media (max-width: 768px) { 
      font-size: 20px;  
    }
  }

  p {
        font-size: 1.125rem;
        font-weight: 500;
        line-height: 1.35;

        @media (max-width: 768px) { 
        font-size: 16px;  
       }
  }

  figcaption {
    font-size: 1.2rem;
    padding-top: 0.2rem;
    font-family: "GT Pressura";
    font-weight: 200;
  }

  blockquote p {
    font-size: 1.875rem;
    padding-left: 2rem;
    font-family: "Suisse Intl";
    font-weight: 800;

    @media (max-width: 768px) { 
        font-size: 20px;  
       }
  }
`;

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <div className="mx-4 my-5 py-5">
      <GlobalStyle />
      <Nav />
      <main>{children}</main>
      <SocialLinks />
    </div>
    <Footer />
  </ThemeProvider>
);

export default Layout;
