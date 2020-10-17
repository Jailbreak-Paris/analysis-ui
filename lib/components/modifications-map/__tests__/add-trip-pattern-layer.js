import {wrapMapComponent, shallowSnapshot} from 'jest/component'
import {mockSegment} from 'jest/mock-data'

import AddTripPatternLayer from '../add-trip-pattern-layer'

const props = {
  bidirectional: false,
  segments: [mockSegment]
}

shallowSnapshot(wrapMapComponent(AddTripPatternLayer, props))
