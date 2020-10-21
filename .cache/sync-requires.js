const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---src-pages-index-js": hot(preferDefault(require("/Users/moritzsalla/Documents/GitHub/msc-19-showcase/src/pages/index.js"))),
  "component---src-templates-blog-post-js": hot(preferDefault(require("/Users/moritzsalla/Documents/GitHub/msc-19-showcase/src/templates/blog-post.js")))
}

