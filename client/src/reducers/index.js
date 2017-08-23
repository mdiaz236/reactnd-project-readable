import {
  REQUEST_CATEGORIES, RECEIVE_CATEGORIES,
  REQUEST_POSTS, RECEIVE_POSTS,
  REQUEST_CATEGORY_POSTS, RECEIVE_CATEGORY_POSTS,
  REQUEST_POST, RECEIVE_POST,
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
  items: [],
  categoryPosts: {},
  individualPosts: {}
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
    case REQUEST_CATEGORY_POSTS:
      return R.merge(state, {
        isFetching: true
      })
    case RECEIVE_CATEGORY_POSTS:
      return R.merge(state, {
        categoryPosts: R.assoc(action.category, action.posts, state.categoryPosts)
      })
    case REQUEST_POST:
      return R.merge(state, {
        isFetching: true
      })
    case RECEIVE_POST:
      return R.merge(state, {
        individualPosts: R.assoc(action.postId, action.post, state.individualPosts)
      })
    default:
      return state
  }
}


export default {categories, posts}
