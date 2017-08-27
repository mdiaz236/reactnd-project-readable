import {
  REQUEST_CATEGORIES, RECEIVE_CATEGORIES,
  REQUEST_POSTS, RECEIVE_POSTS,
  REQUEST_CATEGORY_POSTS, RECEIVE_CATEGORY_POSTS,
  REQUEST_POST, RECEIVE_POST,
  REQUEST_COMMENTS, RECEIVE_COMMENTS,
  UPDATE_POST_VOTE
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
  items: {},
  categoryPostIds: {},
}, action) {
  switch (action.type) {
    case REQUEST_POSTS:
      return R.merge(state, {
        isFetching: true
      })
    case RECEIVE_POSTS:
      return R.merge(state, {
        isFetching: false,
        items: R.indexBy(R.prop('id'), action.posts)
      })
    case REQUEST_CATEGORY_POSTS:
      return R.merge(state, {
        isFetching: true
      })
    case RECEIVE_CATEGORY_POSTS:
      return R.merge(state, {
        isFetching: false,
        items: R.merge(state.items, R.indexBy(R.prop('id'), action.posts)),
        categoryPostIds: R.assoc(action.category,
          R.pluck('id', action.posts), state.categoryPostIds)
      })
    case REQUEST_POST:
      return R.merge(state, {
        isFetching: true
      })
    case RECEIVE_POST:
      return R.merge(state, {
        isFetching: false,
        items: R.assoc(action.postId, action.post, state.items)
      })
    case UPDATE_POST_VOTE:
      return R.merge(state, {
        items: R.assocPath([action.postId, 'voteScore'],
            (R.cond([[R.equals('upVote'), R.always(1)],
                    [R.equals('downVote'), R.always(-1)],
                    [R.T, R.always(0)]]) (action.voteType)) +
            (R.path(['items', action.postId, 'voteScore'], state)),
                    state.items)
      })
    default:
      return state
  }
}

function comments(state = {
  isFetching: false,
  items: {}
}, action){
  switch (action.type) {
    case REQUEST_COMMENTS:
      return R.merge(state, {
        isFetching: true
      })
    case RECEIVE_COMMENTS:
      return R.merge(state, {
        isFetching: false,
        items: R.assoc(action.postId, action.comments, state.items)
      })
    default:
      return state
  }
}

export default {categories, posts, comments}
