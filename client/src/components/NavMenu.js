import  React, { Component } from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchCategories } from '../actions'
import { Dropdown, Menu } from 'semantic-ui-react'
import {  Link } from 'react-router-dom'

class NavMenu extends Component {

  componentDidMount() {
    this.props.dispatch(fetchCategories())
  }

  render() {
    return (
      <Menu>
        <Link to="/">
          <Menu.Item active={this.props.path === '/'}>
            Home
          </Menu.Item>
        </Link>
        <Dropdown item text='Categories'>
          <Dropdown.Menu>
            {R.map((category) => (
              <div key={category.path}>
                <Link to={`/category/${category.name}`}>
                <Dropdown.Item key={category.name}
                  active={this.props.path === `/category/${category.path}`}>
                    {category.name}

                  </Dropdown.Item>
                  </Link>
                </div>
            ), R.sortBy(R.prop('name'), this.props.categories.items))}
          </Dropdown.Menu>
        </Dropdown>
        <Link to="/post/new">
          <Menu.Item active={this.props.path === '/post/new'}>
            New Post
          </Menu.Item>
        </Link>
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
