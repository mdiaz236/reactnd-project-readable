export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

const auth = 'Z2V2kdf#m<.'

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
    return fetch('http://localhost:5001/categories',
       {'headers': {'Authorization': auth}})
      .then(response => response.json(),
            error => console.log('An error occured.', error))
      .then(json => dispatch(receiveCategories(json['categories'])))
  }
}


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
    return fetch('http://localhost:5001/posts',
       {'headers': {'Authorization': auth}})
      .then(response => response.json(),
            error => console.log('An error occured.', error))
      .then(posts => dispatch(receivePosts(posts)))
  }
}
