// export const ADD_RECIPE = 'ADD_RECIPE'
// export const REMOVE_FROM_CALENDAR = 'REMOVE_FROM_CALENDAR'
//
// export function addRecipe ({ day, recipe, meal }) {
//   return {
//     type: ADD_RECIPE,
//     recipe,
//     day,
//     meal
//   }
// }
//
// export function removeFromCalendar ({ day, meal }) {
//   return {
//     type: REMOVE_FROM_CALENDAR,
//     day,
//     meal
//   }
// }
export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

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
       {'headers': {'Authorization': 213}})
      .then(response => response.json(),
            error => console.log('An error occured.', error))
      .then(json => dispatch(receiveCategories(json['categories'])))
  }
}
