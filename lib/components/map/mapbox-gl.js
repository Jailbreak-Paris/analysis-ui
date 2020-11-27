import L from 'leaflet'
import {} from 'mapbox-gl-leaflet'
import {GridLayer, withLeaflet} from 'react-leaflet'
import getConfig from 'next/config'

const {publicRuntimeConfig} = getConfig()

const attribution = `© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>`
const defaultStyle =
  publicRuntimeConfig.mapboxStyle || 'conveyal/cjwu7oipd0bf41cqqv15huoim'
const getStyle = (style = defaultStyle) => `mapbox://styles/${style}`

class MapBoxGLLayer extends GridLayer {
  componentDidUpdate() {
    if (this.leafletElement && this.leafletElement._glMap) {
      this.leafletElement._glMap.resize()
    }
  }

  createLeafletElement(props) {
    const glLayer = (window.MapboxGLLayer = L.mapboxGL({
      accessToken: publicRuntimeConfig.mapboxToken,
      attribution,
      interactive: false,
      pane: props.leaflet.map._panes.tilePane,
      style: getStyle(props.style)
    }))
    return glLayer
  }
}

export default withLeaflet(MapBoxGLLayer)
