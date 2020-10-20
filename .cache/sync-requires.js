const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/moritzsalla/Documents/GitHub/msc-19-showcase/.cache/dev-404-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/Users/moritzsalla/Documents/GitHub/msc-19-showcase/src/pages/404.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/Users/moritzsalla/Documents/GitHub/msc-19-showcase/src/pages/index.js"))),
  "component---src-templates-blog-post-js": hot(preferDefault(require("/Users/moritzsalla/Documents/GitHub/msc-19-showcase/src/templates/blog-post.js")))
}

