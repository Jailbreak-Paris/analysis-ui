/**
 * The side panel for single point analysis, including the spectrogram.
 */

import React, { Component, PropTypes } from 'react'
import Select from 'react-select'
import {sprintf} from 'sprintf-js'
import messages from '../../utils/messages'
import {PROFILE_REQUEST_DEFAULTS} from '../../utils/browsochrones'
import Histogram from './histogram'
import RegionalAnalysisResults from '../../containers/regional-analysis-results'
import convertToR5Modification from '../../utils/convert-to-r5-modification'
import {Button} from '../buttons'
import SpectrogramSelector from './spectrogram-selector'
import Icon from '../icon'
import {Text, Group as FormGroup, Checkbox} from '../input'

export default class SinglePointAnalysis extends Component {
  static propTypes = {
    bundleId: PropTypes.string.isRequired,
    isochroneCutoff: PropTypes.number.isRequired,
    isFetchingIsochrone: PropTypes.bool.isRequired,
    isShowingIsochrone: PropTypes.bool.isRequired,
    isShowingOpportunities: PropTypes.bool.isRequired,
    modifications: PropTypes.array.isRequired,
    scenarioId: PropTypes.string.isRequired,
    projectId: PropTypes.string.isRequired,
    variantIndex: PropTypes.number.isRequired,
    variantName: PropTypes.string.isRequired,
    workerVersion: PropTypes.string.isRequired,
    scenarioName: PropTypes.string.isRequired,
    accessibility: PropTypes.number,
    indicators: PropTypes.array.isRequired,
    currentIndicator: PropTypes.string,
    isochroneLatLng: PropTypes.object.isRequired,
    fetchIsochrone: PropTypes.func.isRequired,
    removeIsochroneLayerFromMap: PropTypes.func.isRequired,
    removeOpportunityLayerFromMap: PropTypes.func.isRequired,
    setIsochroneCutoff: PropTypes.func.isRequired,
    setCurrentIndicator: PropTypes.func.isRequired,
    spectrogramData: PropTypes.array,
    comparisonSpectrogramData: PropTypes.array,
    enterAnalysisMode: PropTypes.func.isRequired,
    exitAnalysisMode: PropTypes.func.isRequired,
    setActiveVariant: PropTypes.func.isRequired,
    clearIsochroneResults: PropTypes.func.isRequired,
    uploadGrid: PropTypes.func.isRequired,
    runAnalysis: PropTypes.func.isRequired,
    comparisonBundleId: PropTypes.string,
    comparisonScenarioId: PropTypes.string,
    comparisonVariant: PropTypes.number,
    setComparisonScenario: PropTypes.func.isRequired,
    comparisonInProgress: PropTypes.bool.isRequired,
    setComparisonInProgress: PropTypes.func.isRequired
  }

  state = {}

  /** signal the UI to make a wider sidebar for analysis mode */
  componentWillMount () {
    this.props.enterAnalysisMode()
    this.props.setActiveVariant(this.props.variantIndex)
  }

  componentWillUnmount () {
    this.props.exitAnalysisMode()
    if (this.props.isShowingIsochrone) this.props.removeIsochroneLayerFromMap()
    if (this.props.isShowingOpportunities) this.props.removeOpportunityLayerFromMap()
    this.props.clearIsochroneResults()
  }

  async componentDidMount () {
    const { currentIndicator, indicators } = this.props
    const chosenIndicator = currentIndicator || indicators[0].key

    this.fetchIsochrone({ chosenIndicator })
  }

  changeIndicator = (e) => {
    this.fetchIsochrone({ chosenIndicator: e.value })
  }

  /** run a new query */
  runAnalysis = (e) => {
    const { workerVersion, runAnalysis, modifications, bundleId, currentIndicator, isochroneCutoff, variantIndex, scenarioId } = this.props

    runAnalysis({
      name: this.state.analysisName,
      workerVersion,
      bundleId,
      grid: currentIndicator,
      cutoffMinutes: isochroneCutoff,
      scenarioId,
      variant: variantIndex,
      request: {
        ...PROFILE_REQUEST_DEFAULTS,
        scenario: {
          modifications: modifications.map(convertToR5Modification)
        }
      }
    })
  }

  setIsochroneCutoff = (chosenCutoff) => {
    this.fetchIsochrone({ chosenCutoff })
  }

  fetchIsochrone = ({ chosenIndicator, chosenCutoff }) => {
    const { projectId, scenarioId, comparisonInProgress, bundleId, modifications, isochroneCutoff, fetchIsochrone, isochroneLatLng, currentIndicator, workerVersion, variantIndex, comparisonVariant, comparisonScenarioId, comparisonBundleId, comparisonModifications } = this.props

    // leave comparison params undefined unless we're doing a comparison
    let comparisonParams = comparisonInProgress
      ? {
        comparisonScenarioId: `${comparisonScenarioId}_${comparisonVariant}`,
        comparisonModifications: comparisonModifications,
        comparisonBundleId: comparisonBundleId
      }
      : {}

    fetchIsochrone({
      scenarioId: `${scenarioId}_${variantIndex}`,
      workerVersion,
      projectId,
      bundleId,
      modifications,
      isochroneCutoff: chosenCutoff || isochroneCutoff,
      origin: isochroneLatLng,
      indicator: chosenIndicator || currentIndicator,
      ...comparisonParams
    })
  }

  toggleComparison = (e) => this.props.setComparisonInProgress(!this.props.comparisonInProgress)

  render () {
    const { currentIndicator, indicators, comparisonInProgress, comparisonSpectrogramData, comparisonScenarioId, comparisonVariant, scenarios, accessibility, isochroneCutoff, spectrogramData, variantName, projectId, scenarioName, isFetchingIsochrone, uploadGrid, scenarioId, variantIndex } = this.props
    const { analysisName } = this.state
    const indicatorName = currentIndicator != null ? indicators.find(i => i.key === currentIndicator).name : undefined

    let comparisonScenarioName

    if (comparisonSpectrogramData) {
      const comparisonScenario = scenarios.find(s => s.id === comparisonScenarioId)
      // variant -1 indicates no modifications, just use the raw bundle
      const variantName = comparisonVariant === -1
        ? messages.analysis.baseline
        : comparisonScenario.variants[comparisonVariant]
      comparisonScenarioName = `${comparisonScenario.name}: ${variantName}`
    }

    return <div className='Analysis'>
      <div className='block'>
        {scenarioName}: {variantName}
        {isFetchingIsochrone && <Icon type='spinner' className='fa-spin pull-right' />}
      </div>

      <div>
        <Select
          name='indicator'
          label={messages.analysis.indicator}
          value={currentIndicator}
          options={indicators.map(({ name, key }) => { return { value: key, label: name } })}
          onChange={this.changeIndicator}
          width={600}
          />
        <Button className='float-right' title={messages.analysis.newGrid} onClick={e => uploadGrid(projectId)}>
          <Icon type='upload' />
        </Button>
      </div>

      <Checkbox
        label={messages.analysis.compare}
        checked={this.state.comparison}
        onChange={this.toggleComparison}
        />

      {comparisonInProgress && this.renderComparisonSelect()}

      {spectrogramData && <div>
        <SpectrogramSelector
          spectrogramData={spectrogramData}
          comparisonSpectrogramData={comparisonSpectrogramData}
          scenarioName={`${scenarioName}: ${variantName}`}
          comparisonScenarioName={comparisonScenarioName}
          isochroneCutoff={isochroneCutoff}
          setIsochroneCutoff={this.setIsochroneCutoff}
          indicatorName={indicatorName}
          isFetchingIsochrone={isFetchingIsochrone}
          />

        <Histogram
          data={spectrogramData}
          comparisonData={comparisonSpectrogramData}
          width={600}
          height={250}
          isochroneCutoff={isochroneCutoff}
          isFetchingIsochrone={isFetchingIsochrone}
          />

        <FormGroup>
          <Text
            value={analysisName}
            placeholder={messages.analysis.analysisName}
            onChange={e => this.setState({ ...this.state, analysisName: e.target.value })}
            />
          <Button onClick={this.runAnalysis}>
            <Icon type='cogs' />
            {messages.analysis.runAnalysis}
          </Button>
        </FormGroup>
      </div>}

      {accessibility != null && currentIndicator && <div>
        {sprintf(messages.analysis.accessibility, {
          indicator: indicatorName,
          cutoff: isochroneCutoff,
          number: accessibility
        })}
        </div>}

      <RegionalAnalysisResults scenarioId={scenarioId} variantIndex={variantIndex} />
    </div>
  }

  setComparisonScenario = (e) => {
    const { scenarios, setComparisonScenario } = this.props
    // reset variant to the baseline
    const scenario = scenarios.find(s => s.id === e.value)
    setComparisonScenario(scenario, -1)
  }

  setComparisonVariant = (e) => {
    const { scenarios, comparisonScenarioId, setComparisonScenario } = this.props
    const scenario = scenarios.find(s => s.id === comparisonScenarioId)
    setComparisonScenario(scenario, e.value)
  }

  /** render the text boxes to choose a comparison scenario and variant */
  renderComparisonSelect () {
    const { scenarios, comparisonScenarioId, comparisonVariant } = this.props

    const scenarioOptions = scenarios.map(s => { return { value: s.id, label: s.name } })
    const chosenScenario = scenarios.find(s => s.id === comparisonScenarioId)
    const variantOptions = chosenScenario != null
      ? [
        // special value -1 indicates no modifications
        { label: messages.analysis.baseline, value: -1 },
        ...chosenScenario.variants.map((label, value) => { return { label, value } })
      ]
      : []

    return <div>
      <Select
        name={messages.common.scenario}
        options={scenarioOptions}
        value={comparisonScenarioId}
        onChange={this.setComparisonScenario}
        />

      <Select
        name={messages.common.variant}
        options={variantOptions}
        value={comparisonVariant}
        onChange={this.setComparisonVariant}
        />
    </div>
  }
}