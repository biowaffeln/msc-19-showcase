import React from 'react';
import Button from '../components/button';
import Layout from '../layouts/index';
import SEO from '../components/seo';
import { Link } from 'gatsby';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  text-align: center;
`;

const NotFoundPage = () => (
  <Layout>
    <SEO title='Page not found' description="There's nothing here" />

    <Wrapper>
      <div>
        <h1>Page not found</h1>
        <br />
        <Link to='/'>
          <Button>Take me home</Button>
        </Link>
      </div>
    </Wrapper>
  </Layout>
);

export default NotFoundPage;
