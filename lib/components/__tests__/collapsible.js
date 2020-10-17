import {testAndSnapshot} from 'jest/component'

import Collapsible from '../collapsible'

testAndSnapshot(Collapsible, {
  title: 'collapse',
  children: 'Hello world'
})
