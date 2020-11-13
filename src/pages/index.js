import React from 'react';
import { Link } from 'gatsby';
import Layout from '../layouts/index';
import SEO from '../components/seo';
import _ from 'lodash';

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  let orderedArray = [];
  posts.map((post) => orderedArray.push(post.node));
  orderedArray = _.shuffle(orderedArray);

  return (
    <Layout>
      <SEO title='CCI | Graduate Showcase 2020' />

      <section className='my-5'>
        {orderedArray.map((post) => (
          <Link key={post.id} to={post.frontmatter.slug}>
            <div className='py-3 py-md-4'>
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
    allMarkdownRemark(sort: { fields: frontmatter___artist, order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            artist
            title
            slug
            thumbnail {
              childImageSharp {
                resize(width: 600) {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;
