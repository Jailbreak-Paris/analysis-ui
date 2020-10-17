import {testAndSnapshot} from 'jest/component'
import {mockFeed} from 'jest/mock-data'

import SelectFeedAndRoutes from '../select-feed-and-routes'

testAndSnapshot(SelectFeedAndRoutes, {
  feeds: [mockFeed],
  onChange: jest.fn()
})
