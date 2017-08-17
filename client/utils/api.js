// const API_ID = process.env.REACT_APP_API_ID
// const APP_KEY = process.env.REACT_APP_APP_KEY

export function fetchCategories() {

  return fetch(`http://localhost:5001/categories`, {'headers': {'Authorization': 213}})
    .then((res) => console.log(res.json()), (error)  => console.log(error.message))
}
