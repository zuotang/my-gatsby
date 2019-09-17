import React from "react"
import Layout from '../components/layout'
import A from '../components/a'
import B from '../components/b'
import useBaseSize from "../components/baseSize";

const IndexPage = () => {
  useBaseSize()
  return (
    <Layout>
      <A />
      <B />
    </Layout>
)}

export default IndexPage
