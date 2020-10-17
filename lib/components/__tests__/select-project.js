import {testComponent} from 'jest/component'
import {mockBundle, mockProject, mockRegion} from 'jest/mock-data'

import SelectProject from '../select-project'

test('Component > SelectProject', () => {
  const props = {
    bundles: [mockBundle],
    region: mockRegion,
    projects: [mockProject]
  }
  const c = testComponent(SelectProject, props)
  expect(c.mount()).toMatchSnapshot()
})
