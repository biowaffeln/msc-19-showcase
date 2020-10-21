(window.webpackJsonp = window.webpackJsonp || []).push([
  [5],
  {
    w2l6: function (e, n, t) {
      "use strict";
      t.r(n);
      var r = t("q1tI"),
        a = t.n(r),
        l = t("vOnD"),
        i = l.c.div.withConfig({
          displayName: "button__Wrapper",
          componentId: "r1rucv-0",
        })(
          [
            "border:1px solid ",
            ";display:inline-flex;border-radius:1rem;&:hover{background:",
            ";color:",
            ";}",
          ],
          function (e) {
            return e.theme.blue;
          },
          function (e) {
            return e.theme.blue;
          },
          function (e) {
            return e.theme.white;
          }
        ),
        o = function (e) {
          var n = e.children;
          return a.a.createElement(i, { className: "px-3 py-1" }, n);
        },
        c = t("aArQ"),
        u = t("vrFN"),
        d = t("Wbzz"),
        m = l.c.div.withConfig({
          displayName: "sc-404__Wrapper",
          componentId: "sc-1j5gszf-0",
        })([
          "display:flex;justify-content:center;align-items:center;height:100vh;width:100%;position:fixed;top:0;left:0;text-align:center;",
        ]);
      n.default = function () {
        return a.a.createElement(
          c.a,
          null,
          a.a.createElement(u.a, { title: "Page not found" }),
          a.a.createElement(
            m,
            null,
            a.a.createElement(
              "div",
              null,
              a.a.createElement("h1", null, "Page not found"),
              a.a.createElement("br", null),
              a.a.createElement(
                d.Link,
                { to: "/" },
                a.a.createElement(o, null, "Take me home")
              )
            )
          )
        );
      };
    },
  },
]);
//# sourceMappingURL=component---src-pages-404-js-373f949f9c2801f3e792.js.map
