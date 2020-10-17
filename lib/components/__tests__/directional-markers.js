import {shallow} from 'enzyme'
import Leaflet from 'leaflet'
import React from 'react'

import {mockPattern} from 'jest/mock-data'

import {
  DirectionalMarkers,
  getDirectionalMarkersForPatterns,
  drawMarkersInTile
} from '../directional-markers'

jest.mock('leaflet')

describe('Component > DirectionalMarkers', () => {
  it('renders without errors', () => {
    shallow(
      <DirectionalMarkers
        color='#fffff'
        leaflet={{
          map: new Leaflet.Map()
        }}
        patterns={[mockPattern]}
      />
    )
  })

  it('generates markers for patterns in a tile correctly', () => {
    const z = 12
    const markers = getDirectionalMarkersForPatterns([mockPattern], z)
    const draw = jest.fn()
    drawMarkersInTile(markers, {x: 659, y: 1592}, z, draw)
    expect(draw).toHaveBeenCalledTimes(2)
  })
})
