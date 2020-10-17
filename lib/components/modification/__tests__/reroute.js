import {REROUTE} from 'lib/constants'
import {testAndSnapshot} from 'jest/component'
import {mockFeed, mockModification, mockRoute} from 'jest/mock-data'

import Reroute from '../reroute'

const mockRerouteModification = {
  ...mockModification,
  dwellTime: 0,
  fromStop: '1',
  routes: [mockRoute.route_id],
  segmentSpeeds: [],
  segments: [],
  toStop: '2',
  type: REROUTE
}

testAndSnapshot(Reroute, {
  feeds: [mockFeed],
  mapState: {state: 'reroute'},
  modification: mockRerouteModification,
  qualifiedStops: [],
  routePatterns: [],
  selectedFeed: mockFeed,
  allStops: [],
  segmentDistances: [],
  stops: [],
  update: jest.fn(),
  updateAndRetrieveFeedData: jest.fn()
})
