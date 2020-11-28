import { graphql, Link } from 'gatsby';
import _ from 'lodash';
import React from 'react';
import Intro from '../components/intro/intro';
import SEO from '../components/seo';
import Layout from '../layouts/index';

const IndexPage = ({ data }) => {
  const seoImage = data.seoImage.childImageSharp.resize.src;
  const posts = data.allMdx.edges;

  let orderedArray = [];
  posts.map((post) => orderedArray.push(post.node));
  orderedArray = _.shuffle(orderedArray);

  return (
    <Layout>
      <SEO
        description='We are the first creative computing cohort of the UAL Creative Computing Institute'
        image={seoImage}
      />

      <Intro />

      <section>
        {orderedArray.map((post) => (
          <Link key={post.id} to={post.frontmatter.slug}>
            <div className='mb-2 mb-md-3'>
              <h3 className='m-0 p-0'>{post.frontmatter.title}</h3>
              <h1 className='m-0 p-0'>{post.frontmatter.artist}</h1>
            </div>
          </Link>
        ))}
      </section>
    </Layout>
  );
};

export const pageQuery = graphql`
  query indexQuery {
    seoImage: file(relativePath: { eq: "socialmedia.jpg" }) {
      childImageSharp {
        resize(width: 1200, height: 628) {
          src
        }
      }
    }
    allMdx(sort: { fields: frontmatter___artist, order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            artist
            title
            slug
          }
        }
      }
    }
  }
`;

export default IndexPage;
