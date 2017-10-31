import * as R from 'ramda'

export const UPDATE_SORT = 'UPDATE_SORT'
export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const REQUEST_CATEGORY_POSTS = 'REQUEST_CATEGORY_POSTS'
export const RECEIVE_CATEGORY_POSTS = 'RECEIVE_CATEGORY_POSTS'
export const REQUEST_POST = 'REQUEST_POST'
export const RECEIVE_POST = 'RECEIVE_POST'
export const UPDATE_POST_VOTE = 'UPDATE_POST_VOTE'
export const ADD_POST = 'ADD_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const REQUEST_COMMENT = 'REQUEST_COMMENT'
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT'
export const UPDATE_COMMENT_VOTE = 'UPDATE_COMMENT_VOTE'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'


const auth = 'Z2V2kdf#m<.'

const apiFetch = (path) => (
  fetch(`http://localhost:5001/${path}`,
   {'headers': {'Authorization': auth}})
)

const apiPut = (path, content) => (
  fetch(`http://localhost:5001/${path}`,
    R.merge({'headers': {'Authorization': auth,
               'Content-Type': 'application/json'},
    'method': 'put'
  }, content))
)

const apiPost = (path, content) => {
  return fetch(`http://localhost:5001/${path}`,
   R.merge({'headers': {'Authorization': auth,
              'Content-Type': 'application/json'},
   'method': 'post'
 }, content))
}

const apiDelete = (path, content) => {
  return fetch(`http://localhost:5001/${path}`,
   R.merge({'headers': {'Authorization': auth,
              'Content-Type': 'application/json'},
   'method': 'delete'
 }, content))
}

// update sorting
export function updateSort(sortKey) {
  return {
    type: UPDATE_SORT,
    sortKey
  }
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
    posts: R.reject(R.or(
          R.propEq('deleted', R.T),
          R.has('error'),
          R.equals(0, (post) => R.empty(R.keys(post)))
        ), posts)
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

// update post votes
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


// edit post
function updatePost(postId, title, body) {
  return {
    type: UPDATE_POST,
    postId,
    title,
    body
  }
}

export function editPost({postId, title, body}) {
  console.log(title, body)
  console.log({'body': JSON.stringify({title, body})})
  return dispatch => {
    dispatch(updatePost(postId, title, body))
    return apiPut(`posts/${postId}`, {'body': JSON.stringify({title, body})})
    .then(response => response.json(),
          error => console.log('An error occured.', error))
    .then(post => dispatch(receivePost(post.id, post)))
  }
}

// submit new post
function addPost(post) {
  return {
    type: ADD_POST,
    post
  }
}

export function submitPost(newPost) {
  return dispatch => {
    dispatch(addPost(newPost))
    return apiPost(`posts`, {'body': JSON.stringify(newPost)})
    .then(response => response.json(),
          error => console.log('An error occured.', error))
    .then(post => dispatch(receivePost(post.id, post)))
  }
}


// delete post

function deletePost(postId) {
  return {
    type: DELETE_POST,
    postId
  }
}

export function removePost(postId) {
  return dispatch => {
    dispatch(deletePost(postId))
    return apiDelete(`posts/${postId}`)
  }
}

// get post comments

function requestComments(postId) {
  return {
    type: REQUEST_COMMENTS,
    postId
  }
}

function receiveComments(postId, comments) {
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

// get comment by id

function requestComment(commentId) {
  return {
    type: REQUEST_COMMENT,
    commentId
  }
}

function receiveComment(commentId, comment) {
  return {
    type: RECEIVE_COMMENT,
    commentId,
    comment
  }
}

export function fetchComment(commentId) {
  return dispatch => {
    dispatch(requestComment(commentId))
    return apiFetch(`comments/${commentId}`)
      .then(response => response.json(),
            error => console.log('An error occured.', error))
      .then(comment => dispatch(receiveComment(commentId, comment)))
  }
}

// add comment

function addComment(newComment) {
  return {
    type: ADD_COMMENT,
    comment: newComment
  }
}

export function submitComment(newComment) {
  return dispatch => {
    dispatch(addComment(newComment))
    return apiPost('comments', {'body': JSON.stringify(newComment)})
      .then(response => response.json(),
            error => console.log('An error occured.', error))
      .then(comment => dispatch(receiveComment(comment.id, comment)))
  }
}

// edit comment

function editComment(updatedComment) {
  return {
    type: EDIT_COMMENT,
    comment: updatedComment
  }
}

export function submitEditedComment(updatedComment) {
  return dispatch => {
    dispatch(editComment(updatedComment))
    return apiPut(`comments/${updatedComment.id}`,
                  {'body': JSON.stringify(updatedComment)})
      .then(response => response.json(),
            error => console.log('An error occured.', error))
      .then(comment => dispatch(receiveComment(comment.id, comment)))
  }
}

// update comment votes
function updateCommentVote(commentId, voteType) {
  return {
    type: UPDATE_COMMENT_VOTE,
    commentId,
    voteType
  }
}

export function voteComment(commentId, voteType) {
  return dispatch => {
    dispatch(updateCommentVote(commentId, voteType))
    return apiPost(`comments/${commentId}`,
      {'body': JSON.stringify({'option': voteType})})
    .then(response => response.json(),
          error => console.log('An error occured.', error))
    .then(comment => dispatch(receivePost(commentId, comment)))
  }
}


// delete comment
function deleteComment(commentId) {
  return {
    type: DELETE_COMMENT,
    commentId
  }
}

export function removeComment(commentId) {
  return dispatch => {
    dispatch(deleteComment(commentId))
    return apiDelete(`comments/${commentId}`)
  }
}
