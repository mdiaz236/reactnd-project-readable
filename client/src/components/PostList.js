import  React, { Component } from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchPosts} from '../actions'
import Post from  './Post'


class PostList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts())
  }

  render() {
    return (
      <div>
        <h2>Posts</h2>
        <ul>
        {R.map((post) => (
          <Post key={post.id} post={post }/>
        ), this.props.posts.items)}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ posts }) => (
  {
    posts
  }
)

PostList.propTypes = {
  PostList: PropTypes.arrayOf(PropTypes.object)
}

export default connect(
  mapStateToProps
)(PostList)
