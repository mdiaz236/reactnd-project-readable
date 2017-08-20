import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Header, Segment } from 'semantic-ui-react'
import * as R from 'ramda'
import { fetchPosts} from '../actions'
import PostContent from './PostContent'


class PostDetail extends Component {

  componentDidMount() {
    this.props.dispatch(fetchPosts())
  }

  render() {
    if (this.props.isFetching) {
      return <div>hold on</div>
    } else if (R.find(R.propEq('id', this.props.match.params.postId), this.props.posts.items)) {
      return <PostContent post={R.find(R.propEq('id', this.props.match.params.postId), this.props.posts.items)} />
  }  else {
    return <div>nope</div>
  }
}
}

const mapStateToProps = ({ posts }) => ({
  posts
})

export default connect(mapStateToProps)(PostDetail)
