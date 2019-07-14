import React from 'react'
import {useStore} from 'react-redux'

import InnerDock from './components/inner-dock'
import Spinner from './components/spinner'
import usePromise from './hooks/use-promise'

const spinnerStyle = {
  color: '#2389c9',
  fontSize: '36px',
  left: '0',
  marginTop: '-18px',
  position: 'absolute',
  textAlign: 'center',
  top: '50%',
  right: '0'
}

export default function withInitialFetch(Component, initialFetch) {
  const isServer = typeof window === 'undefined'

  function ClientFetch(p) {
    const store = useStore()
    const {query, __clientFetch} = p
    const getInitialFetch = React.useCallback(
      () => (__clientFetch ? initialFetch(store, query) : Promise.resolve({})),
      [store, query, __clientFetch]
    )
    const [loading, error, results] = usePromise(getInitialFetch)

    // Short circuit when loaded from server
    if (!__clientFetch) return <Component {...p} />

    return loading ? (
      <InnerDock>
        <div style={spinnerStyle}>
          <Spinner />
        </div>
      </InnerDock>
    ) : error ? (
      <p>{String(error)}</p>
    ) : (
      <Component {...p} {...results} />
    )
  }

  ClientFetch.getInitialProps = async ctx =>
    isServer
      ? await initialFetch(ctx.reduxStore, ctx.query)
      : {__clientFetch: true}

  return ClientFetch
}