import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Sticker from '../components/sticker';
import Layout from '../layouts/index';
import SEO from '../components/seo';
import _ from 'lodash';

const StyledLink = styled(Link)`
  h1 {
    display: inline-flex;
    align-items: flex-start;
  }

  span.super {
    max-width: 15ch;
    hyphens: none;
    display: block;
    overflow: hidden;

    display: -webkit-box;
    -webkit-line-clamp: 3; /* number of lines to show */
    -webkit-box-orient: vertical;
  }
`;

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  let orderedArray = [];
  posts.map((post) => orderedArray.push(post.node));
  orderedArray = _.shuffle(orderedArray);

  return (
    <Layout>
      <SEO title='Graduate Showcase 2020' />

      <a href='https://www.instagram.com/ual_cci/?hl=en'>
        <Sticker>Instagram</Sticker>
      </a>
      <a href='https://www.instagram.com/ual_cci/?hl=en'>
        <Sticker>arts.ac.uk</Sticker>
      </a>

      <section>
        {orderedArray.map((post) => (
          <StyledLink key={post.id} to={post.frontmatter.slug} className='mr-2'>
            <h1>
              {post.frontmatter.artist}
              <span className='super ml-2'>{post.frontmatter.title}</span>
            </h1>
          </StyledLink>
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
