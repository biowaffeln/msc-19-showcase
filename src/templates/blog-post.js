import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../layouts/index';
import { Link } from 'gatsby';
import SEO from '../components/seo';
import Image from 'gatsby-image';
import styled from 'styled-components';

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
`;

export default function BlogPost({ data, pageContext }) {
  const {
    title,
    description,
    artist,
    thumbnail,
  } = data.markdownRemark.frontmatter;

  const body = data.markdownRemark.html;
  const { next } = pageContext;

  return (
    <Layout>
      <SEO
        title={`${artist} | Graduate Showcase 2020`}
        description={description}
      />

      <ProjectLink left='true' to='/' className='p-3 d-none d-xl-flex'>
        <h3>←&nbsp;Project List</h3>
      </ProjectLink>

      {next.artist && (
        <ProjectLink
          right='true'
          to={next.slug}
          className='p-3 d-none d-xl-flex'
        >
          <h3>{next.artist}&nbsp;→</h3>
        </ProjectLink>
      )}

      <section className='mx-auto' style={{ maxWidth: '850px' }}>
        <header className='my-0 my-md-3'>
          <div>
            <h3 className='text-md-center mb-1 mb-md-0'>{artist}</h3>

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
          {body && <div dangerouslySetInnerHTML={{ __html: body }} />}
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
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt(format: PLAIN, pruneLength: 300, truncate: false)
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
          }
        }
      }
    }
  }
`;
