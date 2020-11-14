import React from "react";
import { graphql } from "gatsby";
import Layout from "../layouts/index";
import { Link } from "gatsby";
import SEO from "../components/seo";
import Image from "gatsby-image";
import styled from "styled-components";

const ProjectLink = styled(Link)`
  z-index: 10;
  position: fixed;
  bottom: 0;
  height: 100%;
  display: flex;
  align-items: center;
  pointer-events: none;

  h3 {
    pointer-events: all;
    font-weight: 200;
  }

  ${(props) =>
    props.right &&
    `
    right: 0;
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

  @media (max-width: 1200px) {
    position: relative;
    ${(props) =>
      props.right &&
      `
    display: none;
  `}
  }
`;

const MarkdownWrapper = styled.div`
  p {
    margin: 1.5rem 0;
  }
`;

export default function BlogPost({ data }) {
  const {
    title,
    description,
    artist,
    thumbnail,
  } = data.markdownRemark.frontmatter;
  const body = data.markdownRemark.html;

  return (
    <Layout>
      <SEO
        title={`${artist} | Graduate Showcase 2020`}
        description={description}
      />

      <ProjectLink left="true" to="/" className="p-0 mt-2 mt-xl-0 p-md-4">
        <h3>← Project List</h3>
      </ProjectLink>
      <ProjectLink right="true" to="/" className="p-4">
        <h3>Next Project →</h3>
      </ProjectLink>

      <section className="mx-auto py-md-5" style={{ maxWidth: "850px" }}>
        <header className="d-flex justify-content-center my-5">
          <div>
            <h3 className="text-center pb-2">{artist}</h3>
            <h1 className="text-center pb-4">{title}</h1>
            <h4 className="text-center" css="max-width: 40ch">
              {description}
            </h4>
          </div>
        </header>

        <Image fluid={thumbnail.childImageSharp.fluid} className="mb-3 mt-1" />

        <MarkdownWrapper>
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </MarkdownWrapper>
      </section>
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
        description
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
