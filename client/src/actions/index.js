import * as R from 'ramda'

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const REQUEST_CATEGORY_POSTS = 'REQUEST_CATEGORY_POSTS'
export const RECEIVE_CATEGORY_POSTS = 'RECEIVE_CATEGORY_POSTS'
export const REQUEST_POST = 'REQUEST_POST'
export const RECEIVE_POST = 'RECEIVE_POST'
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const UPDATE_POST_VOTE = 'UPDATE_POST_VOTE'


const auth = 'Z2V2kdf#m<.'

const apiFetch = (path) => (
  fetch(`http://localhost:5001/${path}`,
   {'headers': {'Authorization': auth}})
)

const apiPut = (path, content) => (
  fetch(`http://localhost:5001/${path}`,
  {'headers': {'Authorization': auth, 'Content-Type': 'application/json'},
    'method': 'put',
  'body': JSON.stringify({'option': 'upVote'})})
)

const apiPost = (path, content) => {
  return fetch(`http://localhost:5001/${path}`,
   R.merge({'headers': {'Authorization': auth,
              "Content-Type": "application/json"},
   'method': 'post'
 }, content))
}

// get categories
function requestCategories() {
  return {
    type: REQUEST_CATEGORIES
  }
}

function receiveCategories(categories) {
  return {
    type: RECEIVE_CATEGORIES,
    categories
  }
}

export function fetchCategories() {
  return dispatch => {
    dispatch(requestCategories())
    return apiFetch('categories')
      .then(response => response.json(),
            error => console.log('An error occured.', error))
      .then(json => dispatch(receiveCategories(json['categories'])))
  }
}

// get all posts
function requestPosts() {
  return {
    type: REQUEST_POSTS
  }
}

function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  }
}

export function fetchPosts() {
  return dispatch => {
    dispatch(requestPosts())
    return apiFetch('posts')
      .then(response => response.json(),
            error => console.log('An error occured.', error))
      .then(posts => dispatch(receivePosts(posts)))
  }
}

// get category posts
function requestCategoryPosts(category) {
  return {
    type: REQUEST_CATEGORY_POSTS,
    category
  }
}

function receiveCategoryPosts(category, posts) {
  return {
    type: RECEIVE_CATEGORY_POSTS,
    category,
    posts
  }
}

export function fetchCategoryPosts(category) {
  return dispatch => {
    dispatch(requestCategoryPosts(category))
    return apiFetch(`${category}/posts`)
      .then(response => response.json(),
            error => console.log('An error occured.', error))
      .then(posts => dispatch(receiveCategoryPosts(category, posts)))
  }
}
// get single post
// get category posts
function requestPost(postId) {
  return {
    type: REQUEST_POST,
    postId
  }
}

function receivePost(postId, post) {
  return {
    type: RECEIVE_POST,
    postId,
    post
  }
}

export function fetchPost(postId) {
  return dispatch => {
    dispatch(requestPost(postId))
    return apiFetch(`posts/${postId}`)
      .then(response => response.json(),
            error => console.log('An error occured.', error))
      .then(post => dispatch(receivePost(postId, post)))
  }
}

// update votes
function updatePostVote(postId, voteType) {
  return {
    type: UPDATE_POST_VOTE,
    postId,
    voteType
  }
}

export function votePost(postId, voteType) {
  return dispatch => {
    dispatch(updatePostVote(postId, voteType))
    return apiPost(`posts/${postId}`, {'body': JSON.stringify({'option': voteType})})
    .then(response => response.json(),
          error => console.log('An error occured.', error))
    .then(post => dispatch(receivePost(postId, post)))
  }
}


// update post


// save draft post


// submit new post

// delete post

// get post comments
export function requestComments(postId) {
  return {
    type: REQUEST_COMMENTS,
    postId
  }
}

export function receiveComments(postId, comments) {
  return {
    type: RECEIVE_COMMENTS,
    postId,
    comments
  }
}

export function fetchComments(postId) {
  return dispatch => {
    dispatch(requestComments(postId))
    return apiFetch(`posts/${postId}/comments`)
      .then(response => response.json(),
            error => console.log('An error occured.', error))
      .then(comments => dispatch(receiveComments(postId, comments)))
  }
}
// save draft comment

// edit comment

// delete comment
