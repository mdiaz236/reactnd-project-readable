import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import PostList from './components/PostList'
import CategoryList from './components/CategoryList'
import PostDetail from './components/PostDetail'
import NewPost from './components/NewPost'


import registerServiceWorker from './registerServiceWorker'
import thunkMiddleware from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import 'semantic-ui-css/semantic.min.css'

import createHistory from 'history/createBrowserHistory'
import { Route, Switch } from 'react-router'

import { composeWithDevTools } from 'redux-devtools-extension'

import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import reducers from './reducers'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const navMiddleware = routerMiddleware(history)

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }), composeWithDevTools(
    applyMiddleware(navMiddleware, thunkMiddleware))
)

ReactDOM.render(
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <ConnectedRouter history={history}>
    <div className="ui container">
        <App />
        <Route exact path="/" component={PostList} />
        <Route path="/category/:category" component={CategoryList} />
        <Switch>
          <Route path="/post/new" component={NewPost} />
          <Route path="/post/:postId" component={PostDetail} />
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
