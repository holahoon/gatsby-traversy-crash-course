// -- Using create page api --

const path = require('path') // standard node.js module

exports.createPages = ({boundActionCreators, graphql}) => {
    const {createPage} = boundActionCreators

    const postTemplate = path.resolve('src/templates/blog-post.js')

    return graphql(`
        {
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
                        html
                    }
                }
            }
        }
    `).then(response => {
        if (response.errors){
            return Promise.reject(response.errors)
        }

        response.data.allMarkdownRemark.edges.forEach(({node}) => {
            createPage({
                path: node.frontmatter.path,
                component: postTemplate
            })
        })
    })
}

