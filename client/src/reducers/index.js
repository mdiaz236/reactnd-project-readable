import {
  REQUEST_CATEGORIES, RECEIVE_CATEGORIES,
  REQUEST_POSTS, RECEIVE_POSTS
} from '../actions'
import * as R from 'ramda'

function categories (state = {
  isFetching: false,
  items: []
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

function posts(state = {
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case REQUEST_POSTS:
      return R.merge(state, {
        isFetching: true
      })
    case RECEIVE_POSTS:
      return R.merge(state, {
        isFetching: false,
        items: action.posts
      })
    default:
      return state
  }
}


export default {categories, posts}
