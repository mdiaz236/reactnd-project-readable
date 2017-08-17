import  React, { Component } from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchCategories } from '../actions'

class CategoryList extends Component {

  componentDidMount() {
    this.props.dispatch(fetchCategories())
  }

  render() {
    return (
      <div>
        <h2>Categories</h2>
        <ul>
          {R.map((category) => (
            <li key={category.name}>{category.name}</li>
          ), this.props.categories.items)}
        </ul>
      </div>
    )
  }
}

// const CategoryList = (props) => (
//   <div>
//     <h2>Categories</h2>
//     <ul>
//       {R.map((category) => (
//         <li>{category}</li>
//       ), props.categories.items)}
//     </ul>
//   </div>
// )

const mapStateToProps = ({ categories }) => (
  {
    categories
  }
)


// const mapDispatchToProps = dispatch => {
//   return {
//     fetchCategories: () => dispatch(fetchCategories)
//     }
//   }

CategoryList.propTypes = {
  categories: PropTypes.object
}

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(CategoryList)
