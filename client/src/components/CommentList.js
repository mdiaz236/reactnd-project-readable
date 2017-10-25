import React, { Component } from 'react'
import * as R from 'ramda'
import {Comment, Header, Segment} from 'semantic-ui-react'
import CommentItem from './CommentItem'
import CommentForm from './CommentForm'
import EditComment from './EditComment'

class CommentList extends Component {
  constructor(props) {
   super(props)
   this.state = {
     editing: false,
     editComment: ''
   }
 }
  render() {
    return (
      <Segment>
        <Comment.Group>
          <Header as='h3' dividing>Comments ({
            R.length(R.keys(this.props.comments))})</Header>
          <div>
            {R.map((comment) => (
              comment.id === this.state.editComment ?
              <EditComment key={comment.id}
              initialValues={{
                comment: comment.body
              }}
              cancelEditCommentHandler={() => this.setState({
                editing: false,
                editComment: ''
              })}
              comment={comment}
              onSubmit={(values) => {
                this.props.editCommentSubmit(values, comment.id)
                this.setState({
                  editing: false,
                  editComment: ''
                })
              }}

              /> :
              <CommentItem key={comment.id} comment={comment}
              voteClickHandler={this.props.voteCommentHandler}
              editClickHandler={() => this.setState({
                editing: true, editComment: comment.id})}
              deleteClickHandler={() => (
                this.props.deleteCommentHandler(comment.id))} />
            ), R.reverse(R.sortBy(R.prop('voteScore'), this.props.comments)))}
          </div>
          </Comment.Group>
          <CommentForm commenterDisabled={this.state.editing}
          onSubmit={this.props.newCommentSubmit}/>

      </Segment>
    )
  }
}

export default CommentList
