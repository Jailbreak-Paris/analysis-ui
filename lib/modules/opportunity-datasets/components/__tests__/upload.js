import {testComponent} from 'jest/component'

import Upload from '../upload'

test('upload should render without errors', () => {
  const p = testComponent(Upload)
  expect(p.mount()).toMatchSnapshot()
})
