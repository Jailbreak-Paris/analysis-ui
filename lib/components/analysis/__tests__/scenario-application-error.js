import {testAndSnapshot} from 'jest/component'
import {mockScenarioApplicationError} from 'jest/mock-data'

import ScenarioApplicationError from '../scenario-application-error'

testAndSnapshot(ScenarioApplicationError, {error: mockScenarioApplicationError})
