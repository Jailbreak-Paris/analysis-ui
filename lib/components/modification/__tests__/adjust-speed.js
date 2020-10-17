import {testAndSnapshot} from 'jest/component'
import {mockFeed, mockModification} from 'jest/mock-data'

import AdjustSpeed from '../adjust-speed'

testAndSnapshot(AdjustSpeed, {
  feeds: [mockFeed],
  modification: mockModification,
  routePatterns: [],
  selectedFeed: undefined,
  update: jest.fn(),
  updateAndRetrieveFeedData: jest.fn()
})
