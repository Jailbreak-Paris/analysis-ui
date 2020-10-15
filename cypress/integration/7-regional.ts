const analysisName =
  Cypress.env('dataPrefix') + Cypress.env('region') + '_regional'

describe('Regional', () => {
  before(() => {
    cy.setup('regionalAnalysis')
    cy.fixture('regions/scratch').as('region')
    cy.fixture('regions/scratch-results').as('results')
  })

  it('verifies regional analysis results', function () {
    cy.findByText(/Access to/i)
      .parent()
      .as('legend')
    cy.get('@legend').should('not.contain', 'Loading grids')
    // compare to self with different time cutoff and check the legend again
    cy.findByLabelText(/Compare to/).type(`${analysisName}{enter}`, {
      force: true
    })
    // TODO make these select elements easier to identify
    cy.findByText(/Compare to/)
      .parent()
      .parent()
      .findByRole('option', {name: '45 minutes'})
      .parent()
      .select('60 minutes')
    cy.get('@legend').should('not.contain', 'Loading grids')
    // TODO more semantic selector would be preferable
    // TODO export to GIS produces error locally
    cy.get('button[aria-label*="Export to GIS"')
    // test aggreation area upload
    cy.findByText(/upload new aggregation area/i).click()
    //.click() // TODO export gives an error when running locally
    cy.findByRole('button', {name: 'Upload'}).as('upload').should('be.disabled')
    cy.findByLabelText(/Aggregation area name/i).type('cities')
    cy.findByLabelText(/Select aggregation area files/i)
      .attachFile({
        filePath: this.region.aggregationAreas.files[0],
        encoding: 'base64'
      })
      .attachFile({
        filePath: this.region.aggregationAreas.files[1],
        encoding: 'base64'
      })
      .attachFile({
        filePath: this.region.aggregationAreas.files[2],
        encoding: 'base64'
      })
      .attachFile({
        filePath: this.region.aggregationAreas.files[3],
        encoding: 'base64'
      })
    cy.findByLabelText(/Union/).uncheck({force: true})
    cy.findByLabelText(/Attribute name to lookup on the shapefile/i)
      .clear()
      .type(this.region.aggregationAreas.nameField)
    cy.get('@upload').scrollIntoView().click()
    cy.contains(/Upload complete/, {timeout: 30000}).should('be.visible')
    // TODO label dissociated from input
    //cy.findByLabelText(/Aggregate results to/i)
    //  .type(this.region.aggregationAreas.sampleName+'{enter}')
    // clean up
    cy.findByRole('button', {name: /Delete/}).click()
    cy.findByRole('button', {name: /Confirm/}).click()
  })

  // TODO this is partly tested above but should be refactored into its own
  // test here. This will require setting up an analysis first though
  it('compares two regional analyses')

  // TODO this is partly tested above, but should be separated out into its
  // own test here. Aggregation is blocked by a dissociated label
  // (see note above)
  it('uploads an aggregation area and aggregates results')
})