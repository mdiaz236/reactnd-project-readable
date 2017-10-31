import * as R from 'ramda'

const auth = 'Z2V2kdf#m<.'

export const apiFetch = (path) => (
  fetch(`http://localhost:5001/${path}`,
   {'headers': {'Authorization': auth}})
)

export const apiPut = (path, content) => (
  fetch(`http://localhost:5001/${path}`,
    R.merge({'headers': {'Authorization': auth,
               'Content-Type': 'application/json'},
    'method': 'put'
  }, content))
)

export const apiPost = (path, content) => {
  return fetch(`http://localhost:5001/${path}`,
   R.merge({'headers': {'Authorization': auth,
              'Content-Type': 'application/json'},
   'method': 'post'
 }, content))
}

export const apiDelete = (path, content) => {
  return fetch(`http://localhost:5001/${path}`,
   R.merge({'headers': {'Authorization': auth,
              'Content-Type': 'application/json'},
   'method': 'delete'
 }, content))
}
