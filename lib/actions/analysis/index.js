import dbg from 'debug'
const debug = dbg('scenario-editor:actions > analysis')
import lonlng from 'lonlng'
import {createAction} from 'redux-actions'

import {getIsochronesAndAccessibility} from '../../utils/browsochrones'

export const clearIsochroneResults = createAction('clear isochrone results')
export const setIsochroneCutoff = createAction('set isochrone cutoff')
export const setIsochroneFetchStatus = createAction('set isochrone fetch status')
export const setIsochroneLatLng = createAction('set isochrone latlng', (x) => lonlng(x))
export const setIsochroneResults = createAction('set isochrone results')

export const fetchIsochrone = ({ scenarioId, bundleId, modifications, isochroneCutoff, origin }) => {
  return [
    setIsochroneFetchStatus(true),
    setIsochroneLatLng(origin),
    getIsochronesAndAccessibility({
      scenarioId,
      bundleId,
      modifications,
      isochroneCutoff,
      origin
    })
      .then(({ isochrone }) => [
        setIsochroneResults({ isochrone }),
        setIsochroneFetchStatus(false)
      ])
      .catch((err) => {
        debug(err)
        return clearIsochroneResults()
      })
  ]
}