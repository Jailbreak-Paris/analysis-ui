import TimetableEntry from '../timetable-entry'
import {testAndSnapshot} from 'jest/component'
import {mockTimetable} from 'jest/mock-data'

const props = {
  bidirectional: false,
  modificationStops: [],
  projectTimetables: [],
  timetable: mockTimetable,
  update: jest.fn()
}

testAndSnapshot(TimetableEntry, props)
