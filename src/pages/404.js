import React from 'react';

import Layout from '../layouts/index';
import SEO from '../components/seo';
import Link from 'gatsby';

const NotFoundPage = () => (
  <Layout>
    <SEO title='Nothing here' />
    <h1>There's nothing here</h1>
    <Link to='/'>
      <h2>Go home</h2>
    </Link>
  </Layout>
);

export default NotFoundPage;
