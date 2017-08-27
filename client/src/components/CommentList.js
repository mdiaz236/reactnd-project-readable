import React from 'react'
import * as R from 'ramda'
import {Comment, Form, Button, Header, Segment} from 'semantic-ui-react'
import * as moment from 'moment'

const CommentList = (props) => (
  <Segment>
    <Comment.Group>
      <Header as='h3' dividing>Comments</Header>
      <div>
        {R.map((comment) => (
          <Comment key={comment.id}>
            <Comment.Content>
              <Comment.Author as='a'>{comment.author}</Comment.Author>
              <Comment.Metadata>
                <div>{comment.voteScore}
                  votes</div>
                <div>{moment(comment.timestamp).calendar()}</div>
              </Comment.Metadata>
              <Comment.Text>{comment.body}</Comment.Text>
              <Comment.Actions>
                <Comment.Action>
                  <Button size='mini' icon='arrow up'/>
                  <Button size='mini' icon='arrow down'/>
                </Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        ), R.reverse(R.sortBy(R.prop('voteScore'), props.comments)))}
      </div>

      <Form reply>
        <Form.TextArea/>
        <Button content='Add comment' labelPosition='left' icon='edit' primary/>
      </Form>
    </Comment.Group>
  </Segment>
)

export default CommentList
