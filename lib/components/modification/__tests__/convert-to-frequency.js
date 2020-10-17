import {shallowSnapshot, wrapMapComponent} from 'jest/component'
import {
  mockFeed,
  mockModification,
  mockPattern,
  mockStop1
} from 'jest/mock-data'

import ConvertToFrequency from '../convert-to-frequency'

shallowSnapshot(
  wrapMapComponent(ConvertToFrequency, {
    allPhaseFromTimetableStops: {},
    feeds: [mockFeed],
    feedScopedModificationStops: [mockStop1],
    modification: mockModification,
    projectTimetables: [],
    routePatterns: [mockPattern],
    selectedFeed: mockFeed,

    // actions
    setActiveTrips: jest.fn(),
    update: jest.fn(),
    updateAndRetrieveFeedData: jest.fn()
  })
)
