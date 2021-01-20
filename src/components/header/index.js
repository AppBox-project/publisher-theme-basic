import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import styles from "./styles.module.css"

export default function Header() {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            menus {
              main {
                label
                url
              }
            }
          }
        }
      }
    `
  )
  return (
    <div className={styles.root}>
      <Link to={`/`} className={styles.title}>
        {data.site.siteMetadata.title}
      </Link>

      <div>
        {data.site.siteMetadata.menus.main.map(menuItem => (
          <Link
            to={menuItem.url}
            className={styles.mainMenuLink}
            key={menuItem.url}
          >
            {menuItem.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
