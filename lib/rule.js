'use strict';

var dashify = require('dashify')

function Rule (options) {
  if (!(this instanceof Rule)) {
    return new Rule(options)
  }

  this.index      = options.index || 0
  this.selector   = options.selector
  this.properties = options.properties
}

const SEP           = ' : '
const IMPORTANT     = '!important'
const PROPS_START   = ' { \n'
const PROP_PADDING  = '\t'
const PROP_END      = ';\n'
const PROPS_END     = ' } '

// value from prop
function v (prop) {
  return prop.value
}

// important from prop
function i (prop) {
  return prop.important ? IMPORTANT : ''
}

function propString (propName, prop) {
  return dashify(propName) + SEP + v(prop) + i(prop)
}

function appended (string, propName, prop) {
  return string + PROP_PADDING + propString(propName, prop) + PROP_END
}

function normalized (prop) {
  if (typeof prop === 'string') {
    prop = {
      value     : prop,
      important : false
    }
  }

  return prop
}

Rule.prototype = Object.create({
  toString: function toString () {
    var selector = this.selector

    var string = String(selector) + PROPS_START
    var props = this.properties

    for (var propName in props) {
      if (props.hasOwnProperty(propName)) {
        string = appended(string, propName, normalized(props[propName]))
      }
    }

    return string + PROPS_END
  },

  toArray: function toArray () {
    return [ this.toString(), this.index ]
  }
})

module.exports = Rule
