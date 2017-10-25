import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Form } from 'semantic-ui-react'
import SemanticUIFormField from './SemanticUIFormField'
import * as R from 'ramda'

let CommentForm = (props) => {
  return (
  <Form onSubmit={props.handleSubmit}>
      <Field name='comment' component={SemanticUIFormField} as={Form.TextArea}
      rows={1} autoHeight
      placeholder='Enter comment here' required />
      <Form.Group inline>
         <Field name='owner'
         component={SemanticUIFormField} as={Form.Input}
         label='Commenter' placeholder='Enter comment author' inline
         disabled={R.propOr(false, 'commenterDisabled', props)} />
        <Form.Button content='Add comment'
        icon='edit' primary floated='right' type='submit'/>
      </Form.Group>
    </Form>
  )
}


CommentForm = reduxForm({
  // a unique name for the form
  form: 'comment'
})(CommentForm)

export default CommentForm
