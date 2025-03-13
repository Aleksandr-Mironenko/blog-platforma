import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { thunk as reduxThunk } from 'redux-thunk'

import reducer from './components/reducer'
import App from './components/App'

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose
const store = createStore(reducer, composeEnhancers(applyMiddleware(reduxThunk)))
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
