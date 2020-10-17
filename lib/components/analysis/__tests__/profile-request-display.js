import {testAndSnapshot} from 'jest/component'
import {mockProfileRequest} from 'jest/mock-data'

import ProfileRequestDisplay from '../profile-request-display'

testAndSnapshot(ProfileRequestDisplay, {
  ...mockProfileRequest,
  profileRequest: mockProfileRequest
})
