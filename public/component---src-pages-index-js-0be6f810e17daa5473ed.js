(window.webpackJsonp = window.webpackJsonp || []).push([
  [6],
  {
    RXBc: function (e, t, a) {
      "use strict";
      a.r(t),
        a.d(t, "pageQuery", function () {
          return u;
        });
      var n = a("q1tI"),
        r = a.n(n),
        l = a("Wbzz"),
        i = a("vOnD"),
        s = (a("9eSz"), a("aArQ")),
        o = a("vrFN"),
        c = Object(i.c)(l.Link).withConfig({
          displayName: "pages__StyledLink",
          componentId: "sc-6kvjaa-0",
        })([
          'h1{display:inline-flex;align-items:flex-start;}span.super{letter-spacing:-0.04rem;font-weight:lighter;font-size:1.75rem;font-family:"Suisse Condensed";max-width:15ch;hyphens:auto;}',
        ]),
        m = i.c.header.withConfig({
          displayName: "pages__Header",
          componentId: "sc-6kvjaa-1",
        })(["margin-bottom:20vh;"]),
        u = "2551037589";
      t.default = function (e) {
        var t = e.data.allMarkdownRemark.edges;
        return r.a.createElement(
          s.a,
          null,
          r.a.createElement(o.a, { title: "Graduate Showcase 2020" }),
          r.a.createElement(
            m,
            null,
            r.a.createElement(
              "h2",
              null,
              "UAL Creative Computing Institute",
              r.a.createElement("br", null),
              "MSc Creative Computing Graduates ⓳"
            )
          ),
          r.a.createElement(
            "section",
            null,
            t.map(function (e) {
              return r.a.createElement(
                c,
                {
                  key: e.node.id,
                  to: e.node.frontmatter.slug,
                  className: "mr-4",
                },
                r.a.createElement(
                  "h1",
                  null,
                  e.node.frontmatter.artist,
                  r.a.createElement(
                    "span",
                    { className: "super ml-2" },
                    e.node.frontmatter.title
                  )
                )
              );
            })
          )
        );
      };
    },
  },
]);
//# sourceMappingURL=component---src-pages-index-js-0be6f810e17daa5473ed.js.map
