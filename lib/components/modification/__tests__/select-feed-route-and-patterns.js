import {testAndSnapshot} from 'jest/component'
import {mockFeed, mockPattern, mockRoute} from 'jest/mock-data'

import SelectFeedRouteAndPatterns from '../select-feed-route-and-patterns'

testAndSnapshot(SelectFeedRouteAndPatterns, {
  feeds: [mockFeed],
  onChange: jest.fn(),
  routePatterns: [mockPattern],
  routes: [mockRoute],
  selectedFeed: null,
  trips: []
})
