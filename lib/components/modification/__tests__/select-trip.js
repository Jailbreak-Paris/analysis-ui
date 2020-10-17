//
import enzyme from 'enzyme'
import React from 'react'

import {mockFeed} from 'jest/mock-data'

import SelectTrip from '../select-trip'

describe('Component > SelectTrip', () => {
  it('renders correctly', () => {
    const patternTrips = ['abcd']
    const onChangeFn = jest.fn()
    const routes = ['route1']
    const trip = 'abcd'
    const tree = enzyme.shallow(
      <SelectTrip
        feed={mockFeed}
        onChange={onChangeFn}
        patternTrips={patternTrips}
        routes={routes}
        trip={trip}
      />
    )
    expect(tree).toMatchSnapshot()
    expect(onChangeFn).not.toHaveBeenCalled()
    tree.unmount()
  })
})
