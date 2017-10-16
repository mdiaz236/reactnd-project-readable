import React from 'react'
import { Button, Comment } from 'semantic-ui-react'
import moment from 'moment'

const CommentItem = ({ comment, voteClickHandler }) => (
  <Comment>
      <Comment.Content>
      <Comment.Author as='a'>{comment.author}</Comment.Author>
      <Comment.Metadata>
        <div>
          {comment.voteScore} votes
        </div>
        <div>{moment(comment.timestamp).calendar()}</div>
      </Comment.Metadata>
      <Comment.Text>{comment.body}</Comment.Text>
      <Comment.Actions>
        <Comment.Action>
          <Button size='mini' icon='arrow up'
           onClick={() => voteClickHandler(comment.id, 'upVote')}/>
          <Button size='mini' icon='arrow down'
          onClick={() => voteClickHandler(comment.id, 'downVote')}/>
          <Button size='mini' basic>edit</Button>
          <Button size='mini' color='red' basic>delete</Button>
        </Comment.Action>
      </Comment.Actions>
    </Comment.Content>
  </Comment>
)

export default CommentItem
