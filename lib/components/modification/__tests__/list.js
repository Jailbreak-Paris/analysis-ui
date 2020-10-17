import {testComponent} from 'jest/component'
import {mockProject} from 'jest/mock-data'

import ModificationsList from '../list'

test('Modification > List', () => {
  const c = testComponent(ModificationsList, {
    project: mockProject
  })
  expect(c.mount()).toMatchSnapshot()
})
