import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Form, Select } from 'semantic-ui-react'
import SemanticUIFormField from './SemanticUIFormField'
import * as R from 'ramda'

let PostForm = (props) => {
  const { handleSubmit, categoryOptions } = props

  return (
  <Form onSubmit={handleSubmit}>
      <Field name="title" component={SemanticUIFormField} as={Form.Input}
      label='Title' required placeholder='Enter a title' />
      <Form.Group widths='equal'>
        <Field name='owner' component={SemanticUIFormField} as={Form.Input}
        label='Owner' placeholder='Enter post author'
        disabled={R.propOr(false, 'ownerDisabled', props)} />
        <Field name='category' component={SemanticUIFormField}
        as={Form.Select}
        label='Category' required
        disabled={R.propOr(false, 'categoryDisabled', props)}
        options={categoryOptions}
        control={Select}  />
      </Form.Group>
      <Field name='post' component={SemanticUIFormField} as={Form.TextArea}
      props={{label: 'Post', placeholder: 'Enter post content here',
       required: true}}  />
      <Form.Button>Submit</Form.Button>
    </Form>
  )
}


PostForm = reduxForm({
  form: 'post'
})(PostForm)

export default PostForm
