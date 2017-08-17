import { combineReducers } from 'redux'
import { REQUEST_CATEGORIES, RECEIVE_CATEGORIES } from '../actions'
import * as R from 'ramda'

function categories (state = {
  isFetching: false,
  items: ['Bananas', 'x', 'y']
}, action) {
  switch (action.type) {
    case REQUEST_CATEGORIES:
      return R.merge(state, {
        isFetching: true
      })
    case RECEIVE_CATEGORIES:
      return R.merge(state, {
        isFetching: false,
        items: action.categories
      })
    default:
      return state
  }
}


const app = combineReducers({
  categories
})


export default app
