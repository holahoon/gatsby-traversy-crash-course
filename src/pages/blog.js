import React from "react"
import Link from "gatsby-link"
import {graphql} from 'gatsby'

import Layout from "../components/layout"
import SEO from "../components/seo"

const blogPage = ({ data }) => (
  <Layout>
    <SEO title="Blog Posts" />

    <h1>Latest Posts</h1>

    {data.allMarkdownRemark.edges.map(post => (
      <div key={post.node.id}>
        <h3>{post.node.frontmatter.title}</h3>
        <small>
          Posted by {post.node.frontmatter.author} on{" "}
          {post.node.frontmatter.date}
        </small>
        <br />
        <br />
        <Link to={post.node.frontmatter.path}>Read More</Link>
        <br />
        <br />
        <hr />
      </div>
    ))}

  </Layout>
)

export const pageQuery = graphql`
    query MyQuery {
        allMarkdownRemark {
        edges {
            node {
                frontmatter {
                    author
                    date
                    path
                    title
                }
                id
                }
            }
        }
    }
  
`

export default blogPage
