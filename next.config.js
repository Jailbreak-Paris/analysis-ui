const withMDX = require('@zeit/next-mdx')({
  extension: /\.mdx?$/
})

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  productionBrowserSourceMaps: true,
  publicRuntimeConfig: {
    mapboxToken: process.env.MAPBOX_ACCESS_TOKEN,
    mapboxStyle: process.env.MAPBOX_STYLE
  }
})
