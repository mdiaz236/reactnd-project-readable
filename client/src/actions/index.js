export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const REQUEST_CATEGORY_POSTS = 'REQUEST_CATEGORY_POSTS'
export const RECEIVE_CATEGORY_POSTS = 'RECEIVE_CATEGORY_POSTS'
export const REQUEST_POST = 'REQUEST_POST'
export const RECEIVE_POST = 'RECEIVE_POST'

const auth = 'Z2V2kdf#m<.'

const apiFetch = (path) => (
  fetch(`http://localhost:5001/${path}`,
   {'headers': {'Authorization': auth}})
)

// get categories
export function requestCategories() {
  return {
    type: REQUEST_CATEGORIES
  }
}

export function receiveCategories(categories) {
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
export function requestPosts() {
  return {
    type: REQUEST_POSTS
  }
}

export function receivePosts(posts) {
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
export function requestCategoryPosts(category) {
  return {
    type: REQUEST_CATEGORY_POSTS,
    category
  }
}

export function receiveCategoryPosts(category, posts) {
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
export function requestPost(postId) {
  return {
    type: REQUEST_POST,
    postId
  }
}

export function receivePost(postId, post) {
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
// update post


// save draft post


// submit new post

// delete post

// get post comments

// save draft comment

// edit comment

// delete comment
