import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styles from "./styles.module.css"

export default function Footer() {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            footer {
              active
              text
            }
            menus {
              footer {
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
      <div className={styles.title}>{data.site.siteMetadata.footer.text}</div>

      <div>
        {data.site.siteMetadata.menus.footer.map(menuItem => (
          <a
            href={menuItem.url}
            className={styles.mainMenuLink}
            key={menuItem.url}
          >
            {menuItem.label}
          </a>
        ))}
      </div>
    </div>
  )
}
