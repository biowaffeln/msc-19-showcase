import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../layouts/index';
import { Link } from 'gatsby';
import SEO from '../components/seo';
import Image from 'gatsby-image';

export default function BlogPost({ data }) {
  const post = data.markdownRemark;
  return (
    <Layout>
      <SEO title={`${post.frontmatter.title}, ${post.frontmatter.artist}`} />
      <main className='mx-auto' style={{ maxWidth: '1100px' }}>
        <div className='d-flex justify-content-between'>
          <header>
            <h2>{post.frontmatter.artist}</h2>
            <h1>{post.frontmatter.title}</h1>
          </header>
          <h2>
            <Link to='/'>✕</Link>
          </h2>
        </div>

        <Image
          fluid={post.frontmatter.thumbnail.childImageSharp.fluid}
          className='mt-4 mb-4'
        />

        <div
          dangerouslySetInnerHTML={{ __html: post.html }}
          className='mb-5 pb-5'
        />
      </main>
    </Layout>
  );
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
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
