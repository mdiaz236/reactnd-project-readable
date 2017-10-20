import {
  UPDATE_SORT,
  REQUEST_CATEGORIES, RECEIVE_CATEGORIES,
  REQUEST_POSTS, RECEIVE_POSTS,
  REQUEST_CATEGORY_POSTS, RECEIVE_CATEGORY_POSTS,
  REQUEST_POST, RECEIVE_POST,
  UPDATE_POST_VOTE, ADD_POST, UPDATE_POST,
  DELETE_POST,
  REQUEST_COMMENTS, RECEIVE_COMMENTS,
  REQUEST_COMMENT, RECEIVE_COMMENT,
  UPDATE_COMMENT_VOTE,
  ADD_COMMENT, EDIT_COMMENT,
  CANCEL_COMMENT_EDIT
} from '../actions'
import * as R from 'ramda'

function app (state = {
  sortKey: 'voteScore'
}, action) {
  switch (action.type) {
    case UPDATE_SORT:
      return R.merge(state, {
        sortKey: action.sortKey
      })
    default:
      return state
  }
}

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
    case ADD_POST:
      return R.merge(state, {
        items: R.assoc(action.post.id, action.post, state.items)
      })
    case UPDATE_POST:
      return R.merge(state, {
        items: R.assoc(action.postId,
          R.merge(state.items[action.postId],
            {title: action.title, body: action.body}), state.items)
      })
    case DELETE_POST:
      return R.merge(state, {
        items: R.assoc(action.postId,
          R.merge(state.items[action.postId],
            {deleted: true}), state.items)
      })
    default:
      return state
  }
}

function comments(state = {
  isFetching: false,
  items: {},
  postComments: {},
  edit: 'new'
}, action){
  switch (action.type) {
    case REQUEST_COMMENTS:
      return R.merge(state, {
        isFetching: true
      })
    case RECEIVE_COMMENTS:
      return R.merge(state, {
        isFetching: false,
        items: R.merge(R.indexBy(R.prop('id'), action.comments), state.items),
        postComments: R.assoc(action.postId, R.pluck('id', action.comments),
              state.postComments)
      })
    case REQUEST_COMMENT:
      return R.merge(state, {
        isFetching: true
      })
    case RECEIVE_COMMENT:
      return R.merge(state, {
        isFetching: false,
        items: R.assoc(action.commentId, action.comment, state.items),
        postComments: R.assoc(R.prop('parentId', action.comment),
          R.uniq(R.append(R.prop('id', action.comment),
          state.postComments[R.prop('parentId', action.comment)])),
          state.postComments)
      })
    case UPDATE_COMMENT_VOTE:
      return R.merge(state, {
        items: R.assocPath([action.commentId, 'voteScore'],
            (R.cond([[R.equals('upVote'), R.always(1)],
                    [R.equals('downVote'), R.always(-1)],
                    [R.T, R.always(0)]]) (action.voteType)) +
            (R.path(['items', action.commentId, 'voteScore'], state)),
                    state.items)
      })
    case ADD_COMMENT:
      return R.merge(state, {
        items: R.assoc(action.comment.id, action.comment, state.items),
        postComments: R.assoc(R.prop('parentId', action.comment),
          R.uniq(R.append(R.prop('id', action.comment),
          state.postComments[R.prop('parentId', action.comment)])),
          state.postComments)
      })
    case EDIT_COMMENT:
      return R.merge(state, {
        edit: action.commentId
      })
    case CANCEL_COMMENT_EDIT:
      return R.merge(state, {
        edit: 'new'
      })
    default:
      return state
  }
}

export default {app, categories, posts, comments}
