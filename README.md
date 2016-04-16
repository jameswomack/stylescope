# Stylescope

Don't pollute. Scope your styles.

## Getting Going

Please see the tests to see what works so far. This is not
in a ready state yet. The tested case works, but other things
you'll try may not.

```
const Stylescope       = require('stylescope') 

const el               = document.querySelector('section')
const scopedStyleSheet = Stylescope(el, childSelPropAssoc)

// data-attribute-based selector representing the context
scopedStyleSheet.selector  

// The <style>
scopedStyleSheet.styleEl     

// The CSSStyleSheet
scopedStyleSheet.sheet       

scopedStyleSheet.createRule  
scopedStyleSheet.pushRule    
scopedStyleSheet.pushRules  
scopedStyleSheet.deleteRule
scopedStyleSheet.deleteRules 

// The last set of indexes created
scopedStyleSheet.lastPushedRuleIndexes 
```

## Testing
* Uses Mochify w/ WebDriver. See the [min-webdriver](https://github.com/mantoni/min-webdriver) repo for WebDriver config details.
  * Change `closeOnSuccess` or `closeOnFailure` to inspect the DOM after tests
* The [Mochify](https://github.com/mantoni/mochify.js) detais are useful as well
