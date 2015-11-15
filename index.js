const uid  = require('uid')
const uniq = require('./lib/uniq-selector')
const Docr = require('./lib/document-extensions')
const Shee = require('./lib/sheet-extensions')
const Rule = require('./lib/rule')

// Shim
require('weakmap')

const keys = Object.keys

const SSID  = 'data-stylescope-id'
const SSSID = 'data-stylescope-sheet-id'

const ScopedStyleStore = WeakMap.createStorage()

function createRule (childSel, props) {
  return new Rule({
    selector   : this.selector + ' ' + childSel,
    properties : props
  })
}

// Returns (DEL_FAIL_NO_REF || DEL_FAIL_NOT_FOUND || DEL_SUCCESS)
function deleteRule (selPropPair) {
  return Shee.deleteRule(this.sheet, createRule.apply(this, selPropPair))
}

// Returns a set of deletion constant results
function deleteRules (childSelPropPairs) {
  return childSelPropPairs.map(function (selPropPair) {
    return deleteRule.call(this, selPropPair)
  }.bind(this))
}

function pushRule (selPropPair) {
  return Shee.pushRule(this.sheet, createRule.apply(this, selPropPair))
}

// Returns an index set
function pushRules (childSelPropPairs) {
  const pushedRuleIndexes = childSelPropPairs.map(function (selPropPair) {
    return pushRule.call(this, selPropPair)
  }.bind(this))

  this.lastPushedRuleIndexes = pushedRuleIndexes

  return pushedRuleIndexes
}

function getScopedStyleSheet (el) {
  const ctx = ScopedStyleStore(el)

  if (!el.getAttribute(SSID)) {
    ctx.uid || (ctx.uid = uid())
    el.setAttribute(SSID, ctx.uid)
  }

  ctx.selector    || (ctx.selector    = uniq(el))
  ctx.styleEl     || (ctx.styleEl     = Docr.initStyle(document))
  ctx.sheet       || (ctx.sheet       = ctx.styleEl.sheet)

  ctx.createRule  || (ctx.createRule  = createRule.bind(ctx))
  ctx.pushRule    || (ctx.pushRule    = pushRule.bind(ctx))
  ctx.pushRules   || (ctx.pushRules   = pushRules.bind(ctx))
  ctx.deleteRule  || (ctx.deleteRule  = deleteRule.bind(ctx))
  ctx.deleteRules || (ctx.deleteRules = deleteRules.bind(ctx))

  ctx.lastPushedRuleIndexes || (ctx.lastPushedRuleIndexes = [ ])

  // We could use dataset for this, which doesn't
  // work in JSDOM
  if (!ctx.styleEl.getAttribute(SSSID)) {
    ctx.styleEl.setAttribute(SSSID, ctx.uid)
  }

  return ctx
}

/*
 * Take an HTMLElement and return selectorText
 */
function scopeForStylesAppliedToHTMLElement (el, childSelPropAssoc) {
  const scopedStyleSheet = getScopedStyleSheet(el)

  const childSelPropPairs = keys(childSelPropAssoc).map(function (childSel) {
    return [ childSel, childSelPropAssoc[childSel] ]
  })

  scopedStyleSheet.pushRules(childSelPropPairs)

  return scopedStyleSheet
}

module.exports = scopeForStylesAppliedToHTMLElement
