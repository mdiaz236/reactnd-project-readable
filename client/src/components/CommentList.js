import React from 'react'
import * as R from 'ramda'
import {Comment, Header, Segment} from 'semantic-ui-react'
import CommentItem from './CommentItem'
import CommentForm from './CommentForm'

const CommentList = (props) => (
  <Segment>
    <Comment.Group>
      <Header as='h3' dividing>Comments</Header>
      <div>
        {R.map((comment) => (
          <CommentItem key={comment.id} comment={comment}
          voteClickHandler={props.voteClickHandler}/>
        ), R.reverse(R.sortBy(R.prop('voteScore'), props.comments)))}
      </div>
      </Comment.Group>
      <CommentForm onSubmit={props.newCommentSubmit}/>

  </Segment>
)

export default CommentList
