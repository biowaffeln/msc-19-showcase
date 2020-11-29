const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query MdxQuery {
      allMdx(sort: { fields: frontmatter___artist, order: DESC }) {
        edges {
          next {
            frontmatter {
              artist
              slug
            }
          }
          previous {
            frontmatter {
              artist
              slug
            }
          }
          node {
            slug
          }
        }
      }
    }
  `);

  result.data.allMdx.edges.forEach(({ next, node, previous }) => {
    createPage({
      path: node.slug,
      component: path.resolve(`./src/templates/blog-post.tsx`),
      context: {
        slug: node.slug,
        next: {
          artist: next ? next.frontmatter.artist : null,
          slug: next ? next.frontmatter.slug : null,
        },
        prev: {
          artist: previous ? previous.frontmatter.artist : null,
          slug: previous ? previous.frontmatter.slug : null,
        },
      },
    });
  });
};
