import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { fetchPost, fetchComments, votePost } from '../actions'
import PostContent from './PostContent'
import CommentList from './CommentList'


class PostDetail extends Component {

  componentDidMount() {
    this.props.dispatch(fetchPost(this.props.match.params.postId))
    this.props.dispatch(fetchComments(this.props.match.params.postId))
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.postId !== prevProps.match.params.postId) {
      this.props.dispatch(fetchPost(this.props.match.params.postId))
      this.props.dispatch(fetchComments(this.props.match.params.postId))
    }
  }


  postDisplay(postId, posts, fetching) {
      if (fetching) {
        return <div>hold on</div>
      } else if (R.has(postId, posts)) {
        return <PostContent
        voteClickHandler={(voteType) =>
          this.props.dispatch(votePost(this.props.match.params.postId, voteType))}
                post={R.prop(postId, posts)} />
    }  else {
      return <div>nope</div>
    }
  }

  commentDisplay(postId, comments, fetching) {
      if (fetching) {
        return <div>hold on</div>
      } else if (R.has(postId, comments)) {
        return <CommentList
                comments={R.prop(postId, comments)} />
    }  else {
      return <div>nope</div>
    }
  }

  render() {
    return (<div>
    {this.postDisplay(this.props.match.params.postId,
      this.props.posts,
      this.props.isFetchingPost )}
        {this.commentDisplay(this.props.match.params.postId,
          this.props.comments,
          this.props.isFetchingComments )}
    </div>)
  }
}

const mapStateToProps = ({ posts, comments }) => ({
  isFetchingPost: posts['isFetching'],
  posts: posts['items'],
  isFetchingComments: posts['isFetching'],
  comments: comments['items']
})

export default connect(mapStateToProps)(PostDetail)
