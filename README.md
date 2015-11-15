# Stylescope

Don't pollute. Scope your styles.

## Getting Going

```
const Stylescope       = require('stylescope') 

const el               = document.querySelector('section')
const scopedStyleSheet = Stylescope(el, childSelPropAssoc)

// regular sheet at `scopedStyleSheet.sheet`
```

## Testing
* Uses Mochify w/ WebDriver. See the (https://github.com/mantoni/min-webdriver)[min-webdriver] repo for WebDriver config details.
  * Change `closeOnSuccess` or `closeOnFailure` to inspect the DOM after tests
* The (https://github.com/mantoni/mochify.js)[Mochify] detais are useful as well
