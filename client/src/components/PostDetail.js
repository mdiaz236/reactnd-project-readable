import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import {
  fetchPost, fetchComments, voteComment, votePost, submitComment,
  removePost, submitEditedComment, removeComment
} from '../actions'
import PostContent from './PostContent'
import CommentList from './CommentList'
import * as uuid from 'uuid'
import { reset } from 'redux-form'
import { Loader } from 'semantic-ui-react'


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

  postVoteClickHandler = (voteType) => (
    this.props.dispatch(votePost(this.props.match.params.postId, voteType))
  )

  deletePostHandler = () => {
    this.props.dispatch(removePost(this.props.match.params.postId))
    this.props.history.push(`/`)
  }
  commentVoteClickHandler = (commentId, voteType) => (
    this.props.dispatch(voteComment(commentId, voteType))
  )
  deleteCommentHandler = (commentId) => {
    this.props.dispatch(removeComment(commentId))
  }
  newCommentSubmit = values => {
    const  {comment, owner} = values

    const content = {
      'body': comment, 'author': owner,
      'votes': 1,
      'parentId': this.props.match.params.postId,
      'timestamp': new Date(), 'id': uuid()
    }
    this.props.dispatch(submitComment(content))
    this.props.dispatch(reset('comment'))
  }

  editCommentSubmit = (values, commentId) => {
    const  { comment } = values

    const content = {
      'body': comment,
      'timestamp': new Date(),
      'id': commentId
    }
    this.props.dispatch(submitEditedComment(content))
  }


  postDisplay(postId, posts, fetching) {
      if (fetching) {
        return <Loader active inline='centered' />
      } else if (R.has(postId, posts) & R.not(R.path([postId, 'deleted'], posts))) {
        return <PostContent
        voteClickHandler={this.postVoteClickHandler}
                deletePostHandler={this.deletePostHandler}
                post={R.prop(postId, posts)} />
    }  else {
      return <div>nope</div>
    }
  }

  commentDisplay(postId, postComments, comments, fetching, posts) {
      if (fetching) {
        return ''
      } else if (R.has(postId, postComments) &
                R.not(R.path([postId, 'deleted'], posts))) {
        return (
          <CommentList
                comments={R.props(R.prop(postId, postComments), comments)}
                voteCommentHandler={this.commentVoteClickHandler}
                editCommentSubmit={this.editCommentSubmit}
                deleteCommentHandler={this.deleteCommentHandler}
                newCommentSubmit={this.newCommentSubmit}
                />)
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
          this.props.postComments,
          this.props.comments,
          this.props.isFetchingComments,
          this.props.posts)}
    </div>)
  }
}

const mapStateToProps = ({ posts, comments }) => ({
  isFetchingPost: posts['isFetching'],
  posts: posts['items'],
  isFetchingComments: posts['isFetching'],
  comments: comments['items'],
  postComments: comments['postComments']
})

export default connect(mapStateToProps)(PostDetail)
