import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import thunkMiddleware from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'

import { composeWithDevTools, devToolsEnhancer } from 'redux-devtools-extension'

import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'

import reducers from './reducers'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
// const store = createStore(
//   combineReducers({
//     ...reducers,
//     router: routerReducer
//   }),
//   composeWithDevTools(
//     applyMiddleware(middleware))
// )
const store = createStore(
  reducers, composeWithDevTools(
    applyMiddleware(middleware, thunkMiddleware))
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
// ReactDOM.render(
//   <Provider store={store}>
//     { /* ConnectedRouter will use the store from Provider automatically */ }
//     <ConnectedRouter history={history}>
//       <div>
//         <Route exact path="/" component={App}/>
//       </div>
//     </ConnectedRouter>
//   </Provider>,
//   document.getElementById('root')
// )
registerServiceWorker()
