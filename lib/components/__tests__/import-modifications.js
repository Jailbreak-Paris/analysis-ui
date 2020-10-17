import {testComponent} from 'jest/component'
import {mockProject} from 'jest/mock-data'

import ImportModifications from '../import-modifications'

describe('Component > ImportModifications', () => {
  it('renders correctly', () => {
    const c = testComponent(ImportModifications, {
      projects: [mockProject],
      projectId: '1',
      regionId: '1'
    })
    const wrapper = c.mount()
    expect(wrapper).toMatchSnapshot()
  })
})
