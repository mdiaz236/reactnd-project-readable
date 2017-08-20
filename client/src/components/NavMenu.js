import  React, { Component } from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchCategories } from '../actions'
import { Dropdown, Icon, Input, Menu } from 'semantic-ui-react'
import { NavLink, Link } from 'react-router-dom'

class NavMenu extends Component {

  componentDidMount() {
    this.props.dispatch(fetchCategories())
  }

  render() {
    return (
      <Menu>
        <Menu.Item active={this.props.path === '/'}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Dropdown item text='Categories'>
          <Dropdown.Menu>
            {R.map((category) => (
              <Link to={`/category/${category.name}`}>
              <Dropdown.Item key={category.name}
                active={this.props.path === `/category/${category.name}`}>
                  {category.name}

                </Dropdown.Item>
                </Link>
            ), this.props.categories.items)}
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    )
  }
}


const mapStateToProps = ({ categories, router }) => (
  {
    categories,
    path: router.location.pathname
  }
)

NavMenu.propTypes = {
  categories: PropTypes.object
}

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(NavMenu)
