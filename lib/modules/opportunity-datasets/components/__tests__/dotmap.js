import {testComponent} from 'jest/component'

import Dotmap from '../dotmap'

test('dotmap should render without throwing an error', () => {
  testComponent(Dotmap).mount()
})
