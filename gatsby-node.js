const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// Configuration
const templates = { "blog-posts": "blog-post.js", pages: "page.js" }

// Code
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug === "/index/" ? "/" : slug,
    })
    createNodeField({
      node,
      name: `model`,
      value: node.frontmatter.model,
    })
    createNodeField({
      node,
      name: `hero`,
      value: `${
        node.frontmatter.model === "pages" ? "pages/" : ""
      }${slug.substring(1)}${node.frontmatter.hero}`,
    })
    createNodeField({
      node,
      name: `data`,
      value: node.frontmatter.data || [],
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
              model
              hero
              data
            }
          }
        }
      }
    }
  `)

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    console.log(`Creating ${node.fields.slug}`)
    createPage({
      path: node.fields.slug,
      component: path.resolve(
        `./src/templates/${templates[node.fields.model]}`
      ),
      context: node.fields,
    })
  })
}
