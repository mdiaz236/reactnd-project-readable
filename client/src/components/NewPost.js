import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react'
import * as uuid from 'uuid'
import { connect } from 'react-redux'
import * as R from 'ramda'
import {submitPost} from '../actions'
import PostForm from './PostForm'
import { withRouter } from 'react-router-dom'

class NewPost extends Component {

  // handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = e => {
    const { title, owner, category, post } = e

    const content = {
      'title': title, 'owner': owner, 'category': category, 'body': post,
      'timestamp': new Date(), 'id': uuid()
    }
    this.props.dispatch(submitPost(content))
    this.props.history.push(`/post/${content.id}`)
  }

  render() {
    return (
      <Segment>

      <PostForm onSubmit={this.handleSubmit}
      categoryOptions={this.props.categoryOptions}
      />
      </Segment>
    )
  }
}

const mapStateToProps = ({ categories }) => ({
  categoryOptions: R.map(category => ({'key': category.name,
  'text': category.name, 'value': category.name}),
  R.defaultTo([], categories.items))
})

export default withRouter(connect(mapStateToProps)(NewPost))
