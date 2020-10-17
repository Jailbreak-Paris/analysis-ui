import isochrone from '../isochrone'
import {mockSurface} from 'jest/mock-data'

describe('selectors > isochrone', () => {
  it('should interpolate isochrone correctly', () => {
    const iso = isochrone({
      analysis: {
        travelTimeSurface: mockSurface,
        profileRequest: {
          maxTripDurationMinutes: 60
        }
      }
    })

    expect(iso).toMatchSnapshot()
  })
})
