import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Img from "gatsby-image"
import styles from "./blog-post.module.css"

export default function BlogPost({ data }) {
  const post = data.markdownRemark
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
      <h1 className={styles.siteHeader}>{post.frontmatter.title}</h1>
      <div className={styles.content}>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!, $hero: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
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
