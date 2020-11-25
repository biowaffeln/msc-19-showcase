import { MDXRenderer } from 'gatsby-plugin-mdx';
import { graphql, Link } from 'gatsby';
import Image from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';
import SEO from '../components/seo';
import Layout from '../layouts/index';

const ProjectLink = styled(Link)`
  z-index: 10;
  position: fixed;
  bottom: 0;
  height: 100%;
  display: flex;
  align-items: center;
  pointer-events: none;

  h3 {
    max-width: 15ch;
    pointer-events: all;
    font-weight: 300;
  }

  ${(props) =>
    props.right &&
    `
    right: 0;
    text-align: right;
  `}

  ${(props) =>
    props.left &&
    `
    left: 0;
  `}

   @media (min-width: 768px) {
    h3 {
      font-size: 1.5rem;
    }
  }
`;

const MarkdownWrapper = styled.div`
  p {
    margin: 1.5rem 0;
  }

  /* make youtube resonsive  */
  .iframe-wrapper {
    position: relative;
    width: 100%;
    padding-top: 56.25%;
    iframe {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
`;

export default function BlogPost({ data, pageContext }) {
  const { title, description, artist, thumbnail, slug } = data.mdx.frontmatter;

  const { excerpt, body } = data.mdx;

  const nextPost = pageContext.next;
  const socialMediaImage = thumbnail
    ? thumbnail.childImageSharp.resize.src
    : null;

  return (
    <Layout>
      <SEO
        title={artist}
        description={excerpt}
        slug={slug}
        image={socialMediaImage}
      />

      <ProjectLink left='true' to='/' className='p-3 d-block d-xl-flex'>
        <h3>←&nbsp;Project List</h3>
      </ProjectLink>

      {nextPost.artist && (
        <ProjectLink
          right='true'
          to={nextPost.slug}
          className='p-3 d-none d-xl-flex'
        >
          <h3>{nextPost.artist}&nbsp;→</h3>
        </ProjectLink>
      )}

      <section className='mx-auto' style={{ maxWidth: '850px' }}>
        <header className='my-0 my-md-3'>
          <div>
            <h3 className='text-md-center mb-md-0'>{artist}</h3>
            <h1 className='text-md-center py-0 py-md-3 mb-0'>{title}</h1>
            <h4 className='text-md-center py-2 py-md-0 mx-md-auto w-75 mx-0'>
              {description}
            </h4>
          </div>
        </header>

        {thumbnail && (
          <Image fluid={thumbnail.childImageSharp.fluid} className='mb-3' />
        )}

        <MarkdownWrapper>
          <MDXRenderer>{body}</MDXRenderer>
        </MarkdownWrapper>
      </section>
    </Layout>
  );
}
BlogPost.defaultProps = {
  artist: 'Artist',
  title: 'Title',
  description: 'Description',
};

export const query = graphql`
  query($slug: String!) {
    mdx(slug: { eq: $slug }) {
      body
      excerpt(pruneLength: 170, truncate: false)
      frontmatter {
        title
        slug
        artist
        description
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 1000, quality: 80) {
              ...GatsbyImageSharpFluid_withWebp
            }
            resize(width: 1200, height: 628) {
              src
            }
          }
        }
      }
    }
  }
`;
