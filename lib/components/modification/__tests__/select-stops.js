import {testAndSnapshot} from 'jest/component'
import {mockModification} from 'jest/mock-data'

import SelectStops from '../select-stops'

testAndSnapshot(SelectStops, {
  modification: mockModification
})
