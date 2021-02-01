import { Link } from "gatsby"
import React from "react"
import Grid from "@material-ui/core/Grid"

export default function DisplayData({ title, mode, data }) {
  return (
    <>
      {title && <h4>{title}</h4>}
      {mode === "list" ? (
        <ListView data={data} />
      ) : mode === "grid" ? (
        <GridView data={data} />
      ) : (
        `Unknown display mode ${mode}.`
      )}
    </>
  )
}

const ListView = ({ data }) => (
  <>
    {data.map(node => {
      const item = node.node
      return (
        <div key={item.id}>
          <Link to={item.fields.slug}>
            <h4>{item.frontmatter.title}</h4>
          </Link>
          {item.excerpt}
        </div>
      )
    })}
  </>
)

const GridView = ({ data }) => (
  <Grid container>
    {data.map(node => {
      const item = node.node
      return (
        <Grid item xs={3} key={item.id}>
          <Link to={item.fields.slug}>
            <h4>{item.frontmatter.title}</h4>
          </Link>
          {item.excerpt}
        </Grid>
      )
    })}
  </Grid>
)
