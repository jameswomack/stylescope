const StyleScope = require('../../')

const Chai = require('chai')

const expect = Chai.expect

describe('StyleScope', function () {
  var sectionEl
  var unorderedListEl
  var listEl
  var textNode
  var scopedSheet

  // we're only using px because that's what `getComputedStyle` uses :(
  const cssObject = Object.freeze({
    ul : {
      fontSize: '18px'
    }
  })

  before(function () {
    sectionEl = document.createElement('section')
    unorderedListEl = document.createElement('ul')
    listEl = document.createElement('li')
    textNode = document.createTextNode('Foo')
    listEl.appendChild(textNode)
    unorderedListEl.appendChild(listEl)
    sectionEl.appendChild(unorderedListEl)
    document.body.appendChild(sectionEl)
  })

  beforeEach(function () {
    scopedSheet = StyleScope(sectionEl, cssObject)
  })

  it('reports last pushed indexes', function () {
    expect(scopedSheet.lastPushedRuleIndexes).to.eql([ 0 ])
  })

  it('creates the expected styles', function () {
    const uid = scopedSheet.uid
    const firstRule = scopedSheet.sheet.rules.item(0)
    expect(firstRule.cssText).to.eql('[data-stylescope-id="'+uid+'"] ul { font-size: 18px; }')
  })

  it('assign a uid to the el', function () {
    const uid = sectionEl.getAttribute('data-stylescope-id')
    expect(uid).to.be.a('string')
  })

  it('creates a stylesheet', function () {
    const uid = scopedSheet.uid
    const styleSheetEl = document.querySelector('[data-stylescope-sheet-id="' + uid + '"]')
    expect(styleSheetEl).to.not.be.a('null')
  })

  it('results in applied styles', function () {
    const styles = window.getComputedStyle(unorderedListEl)
    expect(styles.fontSize).to.eql('18px')
  })
})
