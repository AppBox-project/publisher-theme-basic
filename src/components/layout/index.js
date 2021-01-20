import React from "react"
import "./styles.module.css"
import Header from "../header"
import Footer from "../footer"

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
