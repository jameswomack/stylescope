'use strict';

var RuleExtensions = require('./rule-extensions'),
    SheetConstants = require('./sheet-constants'),
    mezclar        = require('./mezclar')

var SheetExtensions = Object.create(mezclar({
  // 'push' here means that it's appended to `sheet`, as per `Array`
  pushRule: function pushRule (sheet, rule) {
    const ruleText = rule.toString()
    const index = sheet.insertRule(ruleText, sheet.cssRules.length)

    return this.indexRule(sheet, rule, index)
  },

  deleteRule: function deleteRule (sheet, rule) {
    if (!RuleExtensions.hasCSSStyleRuleReference(rule)) {
      return this.DEL_FAIL_NO_REF
    } else if (!sheet.rule.item(rule.cssStyleRuleIndex)) {
      return this.DEL_FAIL_NOT_FOUND
    } else {
      /*
       * Exceptions for `deleteRule` =>
       * INDEX_SIZE_ERR: Raised if the specified index does not correspond to a rule in the style sheet's rule list.
       * NO_MODIFICATION_ALLOWED_ERR: Raised if this style sheet is readonly.
      */
      sheet.deleteRule(rule.cssStyleRuleIndex)

      RuleExtensions.derefCSSStyleRuleAndIndex(rule)

      return this.DEL_SUCCESS
    }
  },

  indexRule: function indexRule (sheet, rule, index) {
    var cssStyleRule = sheet.rules.item(index)

    RuleExtensions.referToCSSStyleRuleAndIndex(rule, cssStyleRule, index)
    return index
  },

  // 'add' here means that it's added according to `rule.index`
  addRule: function addRule (sheet, rule) {
    var index = sheet.insertRule.apply(sheet, rule.toArray())

    return this.indexRule(sheet, rule, index)
  },

  // Self-explanatory ⬇️
  addRuleAtIndex: function addRuleAtIndex (sheet, rule, index) {
    var confirmedIndex = sheet.insertRule(rule.toString(), index)

    return this.indexRule(sheet, rule, confirmedIndex)
  }
}, SheetConstants))

module.exports = SheetExtensions
