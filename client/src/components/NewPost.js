import React, { Component } from 'react'
import { Form, Segment } from 'semantic-ui-react'
import * as uuid from 'uuid'
import { connect } from 'react-redux'
import * as R from 'ramda'
import {submitPost} from '../actions'

class NewPost extends Component {
  state = { 'title': '', 'owner': '', 'category': '', 'post': ''
 }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = e => {
    const { title, owner, category, post } = this.state

    this.props.dispatch(submitPost({
      'title': title, 'owner': owner, 'category': category, 'body': post,
      'timestamp': new Date(), 'id': uuid()}))
  }

  options = () => (
   R.map(category => ({'key': category.name,
  'text': category.name, 'value': category.name}), R.defaultTo([], this.props.categories.items))
  )


  render() {
    return (
      <Segment>
      <Form onSubmit={this.handleSubmit}>
        <Form.Input required name='title' label='Title' placeholder='Title'
        onChange={this.handleChange}/>
        <Form.Group widths='equal'>
          <Form.Input label='Owner' placeholder='Post owner name'
            name='owner' onChange={this.handleChange}/>
          <Form.Select required label='Category'
          options={this.options()}
          placeholder='Category'
          onChange={this.handleChange} name='category'/>
        </Form.Group>
        <Form.TextArea required label='Post' placeholder='Enter post content here'
        name='post' onChange={this.handleChange}/>
        <Form.Button>Submit</Form.Button>
      </Form>
      </Segment>
    )
  }
}

const mapStateToProps = ({ categories }) => ({
  categories
})

export default connect(mapStateToProps)(NewPost)
