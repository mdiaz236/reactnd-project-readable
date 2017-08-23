import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { fetchPost} from '../actions'
import PostContent from './PostContent'


class PostDetail extends Component {

  componentDidMount() {
    this.props.dispatch(fetchPost(this.props.match.params.postId))
  }

  render() {
    if (this.props.isFetching) {
      return <div>hold on</div>
    } else if (R.has(this.props.match.params.postId, this.props.individualPosts)) {
      return <PostContent
              post={R.prop(this.props.match.params.postId, this.props.individualPosts)} />
  }  else {
    return <div>nope</div>
  }
}
}

const mapStateToProps = ({ posts }) => ({
  individualPosts: posts['individualPosts']
})

export default connect(mapStateToProps)(PostDetail)
