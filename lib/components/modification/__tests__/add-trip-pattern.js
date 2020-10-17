import {testAndSnapshot} from 'jest/component'
import {mockModification} from 'jest/mock-data'
import AddTripPattern from '../add-trip-pattern'

const props = {
  allPhaseFromTimetableStops: [],
  allStops: [],
  gtfsStops: [],
  mapState: null,
  modification: mockModification,
  modificationStops: [],
  numbeOfStops: 0,
  projectTimetables: [],
  qualifiedStops: [],
  segmentDistances: [],
  timetables: [],
  update: jest.fn()
}

testAndSnapshot(AddTripPattern, props)
