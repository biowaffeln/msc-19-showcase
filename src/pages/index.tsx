import { graphql, Link } from 'gatsby';
import _ from 'lodash';
import React from 'react';
import Jumbo from '../components/jumbo/Jumbo';
import SEO from '../components/SEO';
import Layout from '../layouts/index';

const IndexPage = ({ data }) => {
  const seoImage = data.seoImage.childImageSharp.resize.src;
  const posts = data.allMdx.edges;

  // ----- shuffled order
  // let orderedArray = [];
  // posts.map((post) => orderedArray.push(post.node));
  // orderedArray = _.shuffle(orderedArray);

  return (
    <Layout>
      <SEO
        description='We are the first creative computing cohort of the UAL Creative Computing Institute'
        image={seoImage}
      />

      <Jumbo />

      <section>
        {posts.map(({ node }) => (
          <Link key={node.id} to={node.frontmatter.slug}>
            <div className='mb-3 mb-md-3'>
              <h3 className='m-0 p-0'>{node.frontmatter.title}</h3>
              <h1 className='m-0 p-0'>{node.frontmatter.artist}</h1>
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
    allMdx(sort: { fields: frontmatter___artist, order: ASC }) {
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
