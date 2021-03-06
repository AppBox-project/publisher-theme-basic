import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Img from "gatsby-image"
import styles from "./blog-post.module.css"
import DisplayData from "../appbox-site-components/DisplayData"
import { filter } from "lodash"

export default function Page({ data }) {
  const page = data.markdownRemark
  return (
    <Layout>
      <Img
        fluid={data.file.childImageSharp.fluid}
        draggable={false}
        objectFit="cover"
        style={{
          minHeight: "450px",
        }}
      />
      <h1 className={styles.siteHeader}>{page.frontmatter.title}</h1>
      <div className={styles.content}>
        {page.htmlAst.children.map(element => (
          <DisplayElement {...element} allData={data.allMarkdownRemark.edges} />
        ))}
      </div>
    </Layout>
  )
}

function DisplayElement({
  children,
  properties,
  tagName,
  value,
  type,
  allData,
}) {
  if (type === "text") {
    if (value.match(/^DisplayData/)) {
      const propertiesList = value.split(":")[1].split("|")
      const properties = {}
      propertiesList.map(
        prop => (properties[prop.split("=")[0]] = prop.split("=")[1])
      )
      return (
        <DisplayData
          {...properties}
          data={filter(
            allData,
            o => o.node.frontmatter.model === properties.model
          )}
        />
      )
    } else {
      return value
    }
  } else {
    if (tagName) {
      // Render regular HTML tag (recursive)
      const Element = tagName
      return (
        <Element {...properties}>
          {children.map(child => (
            <DisplayElement {...child} allData={allData} />
          ))}
        </Element>
      )
    } else {
      // Unknown.
      return
    }
  }
}

export const query = graphql`
  query($slug: String!, $hero: String!, $data: [String]) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      frontmatter {
        title
      }
    }
    allMarkdownRemark(filter: { frontmatter: { model: { in: $data } } }) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            model
          }
          excerpt
        }
      }
    }
    file(relativePath: { eq: $hero }) {
      childImageSharp {
        fluid(maxHeight: 650, maxWidth: 1920) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
`
