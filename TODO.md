# TODO

* Recommend and use `rem` unit where possible
* Evalute https://github.com/cognitect-labs/transducers-js/blob/master/test/tests.js
  * http://blog.cognitect.com/blog/2014/8/6/transducers-are-coming
* Look into compliance with css-modules/icss
* Explain why css-modules/css-modules is a poor choice in most cases
  * Looks like CSS but isn't
  * Doesn't comply with a DOM API like CSSStyleDeclaration
  * Based heavily on classes (no component names, ids, selectors etc.)
  * Build-time only. As our styling becomes more dynamic, the tools are
    becoming less so, and that's a trend that must be countered
* Compare ease and perf of using Stylescope vs:
  * https://github.com/johnotander/furtive && uncss
  * React inline styles
* Have examples of shared "CSS" via https://github.com/substack/factor-bundle/blob/master/index.js
* Find non-Gulp alternative to https://github.com/charliedowler/gulp-flowtype. Types very beneficial for DOM APIs.
* Look into alternative approaches to / benefits of https://github.com/JedWatson/classnames
* https://github.com/mantoni/mochify.js#code-coverage-with-istanbul
* Either get Selenium to shut down with Mochify or use something like Saucelabs
* Put some type of server rendering on roadmap or put something in README regarding why not
