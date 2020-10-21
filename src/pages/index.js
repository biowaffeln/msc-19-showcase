import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Image from "gatsby-image";

import Layout from "../layouts/index";
import SEO from "../components/seo";

const StyledLink = styled(Link)`
  h1 {
    display: inline-flex;
    align-items: flex-start;
  }

  span.super {
    letter-spacing: -0.04rem;
    font-weight: lighter;
    font-size: 1.75rem;
    font-family: "Suisse Condensed";
    max-width: 15ch;
    hyphens: auto;
  }
`;

const Header = styled.header`
  margin-bottom: 20vh;
`;

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <SEO title="Graduate Showcase 2020" />
      <Header>
        <h2>
          UAL Creative Computing Institute
          <br />
          MSc Creative Computing Graduates ⓳
        </h2>
      </Header>

      <section>
        {posts.map((post) => (
          <StyledLink
            key={post.node.id}
            to={post.node.frontmatter.slug}
            className="mr-4"
          >
            <h1>
              {post.node.frontmatter.artist}
              <span className="super ml-2">{post.node.frontmatter.title}</span>
            </h1>
          </StyledLink>
        ))}
      </section>
    </Layout>
  );
};

export const pageQuery = graphql`
  query indexQuery {
    allMarkdownRemark {
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
