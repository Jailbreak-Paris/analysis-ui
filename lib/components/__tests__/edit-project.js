import {mockBundle, mockProject} from 'jest/mock-data'
import {testComponent} from 'jest/component'

import EditProject from '../edit-project'

test('Component > EditProject', () => {
  const props = {
    bundleName: mockBundle.name,
    project: mockProject,
    query: {}
  }

  const c = testComponent(EditProject, props)
  expect(c.mount()).toMatchSnapshot()
})
