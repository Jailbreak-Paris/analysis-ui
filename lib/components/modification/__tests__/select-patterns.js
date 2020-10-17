import {mockPattern} from 'jest/mock-data'
import {testAndSnapshot} from 'jest/component'

import SelectPatterns from '../select-patterns'

testAndSnapshot(SelectPatterns, {
  onChange: jest.fn(),
  routePatterns: [mockPattern],
  trips: null
})
