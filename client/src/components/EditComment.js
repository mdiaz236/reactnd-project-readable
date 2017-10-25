import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Form , Button, Comment} from 'semantic-ui-react'
import SemanticUIFormField from './SemanticUIFormField'
import moment from 'moment'

let EditComment = ({ comment, handleSubmit, cancelEditCommentHandler,
                      pristine }) => (
  <Form onSubmit={handleSubmit}>
  <Comment>
      <Comment.Content>
      <Comment.Author as='a'>{comment.author}</Comment.Author>
      <Comment.Metadata>
        <div>
          {comment.voteScore} votes
        </div>
        <div>{moment(comment.timestamp).calendar()}</div>
      </Comment.Metadata>
        <Field name='comment' component={SemanticUIFormField} as={Form.TextArea}
        rows={1} autoHeight required />
      <Comment.Actions>
        <Comment.Action>
          <Button size='mini' icon='arrow up' disabled/>
          <Button size='mini' icon='arrow down' disabled/>
          <Button size='mini' primary type='submit'
          disabled={pristine}>submit</Button>
          <Button size='mini' color='red'
          onClick={cancelEditCommentHandler}>cancel</Button>
        </Comment.Action>
      </Comment.Actions>
    </Comment.Content>
  </Comment>
  </Form>
)


EditComment = reduxForm({
  // a unique name for the form
  form: 'editComment'
})(EditComment)

export default EditComment
