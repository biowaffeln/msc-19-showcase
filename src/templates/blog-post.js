import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../layouts/index';
import { Link } from 'gatsby';
import SEO from '../components/seo';
import Image from 'gatsby-image';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

const Outline = styled.div`
  border: ${(props) => props.theme.strokeWeight} solid
    ${(props) => props.theme.blue};
  border-radius: ${(props) => props.theme.borderRadius};
`;

export default function BlogPost({ data }) {
  const post = data.markdownRemark;

  const fadein = useSpring({
    from: { transform: `translateY(200px)`, opacity: 0 },
    to: { transform: `translateY(0px)`, opacity: 1 },
  });

  const maxWidth = { maxWidth: '1000px' };

  return (
    <Layout>
      <SEO
        title={`${post.frontmatter.artist} | Graduate Showcase 2020`}
        description={post.excerpt}
      />

      <animated.section
        className='mx-auto mb-5'
        style={{ ...maxWidth, ...fadein }}
      >
        <Outline className='p-3'>
          <div className='d-flex justify-content-between'>
            <header>
              <h1>{post.frontmatter.title}</h1>
              <h2>{post.frontmatter.artist}</h2>
            </header>
            <h2>
              <Link to='/' css='padding: 1rem; margin: -1rem'>
                ✕
              </Link>
            </h2>
          </div>

          <Image
            fluid={post.frontmatter.thumbnail.childImageSharp.fluid}
            className='mb-3 mt-1'
          />

          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </Outline>
      </animated.section>
    </Layout>
  );
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt(format: PLAIN, pruneLength: 300, truncate: false)
      frontmatter {
        title
        slug
        artist
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 1000, quality: 80) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
      }
    }
  }
`;
