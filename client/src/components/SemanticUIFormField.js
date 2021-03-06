import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'semantic-ui-react'

// from https://gist.github.com/mairh/233f6b4ffdbaaed8ec75bb0bef087e8f
export default function SemanticUIFormField ({ input, type, label, placeholder,
   meta: { touched, error, warning }, as: As = Input, ...props }) {
  function handleChange (e, { value }) {
    return input.onChange(value)
  }
  return (
    <Form.Field>
      <As {...props} {...input} value={input.value} type={type} label={label} placeholder={placeholder} onChange={handleChange} />
      {touched && ((error && <span><i>{error}</i></span>) || (warning && <span><i>{warning}</i></span>))}
    </Form.Field>
  )
}

SemanticUIFormField.propTypes = {
  as: PropTypes.any,
  input: PropTypes.object,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.object
}
