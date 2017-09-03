import React, { Component } from 'react'
import { Form, Segment } from 'semantic-ui-react'
import {editPost, fetchPost} from '../actions'
import { connect } from 'react-redux'
import * as R from 'ramda'
import PostForm from './PostForm'
import { withRouter } from 'react-router-dom'
class EditPost extends Component {

  post = {
    title: R.path([this.props.match.params.postId, 'title'], this.props.posts)
  }

 componentDidMount() {
   this.props.dispatch(fetchPost(this.props.match.params.postId))
 }

 componentDidUpdate(prevProps) {
   if (this.props.match.params.postId !== prevProps.match.params.postId) {
     this.props.dispatch(fetchPost(this.props.match.params.postId))
   }
 }

  handleSubmit = e => {
    const { title, post } = e
    const content = {
      'postId': this.props.match.params.postId,
      'title': title, 'body': post,
    }
    console.log(content)
    this.props.dispatch(editPost(content))
    this.props.history.push(`/post/${content.postId}`)
  }


  render() {
    return (
      <Segment>
      {this.props.isFetchingPost ? <div>nope</div> :
      <PostForm onSubmit={this.handleSubmit}
      categoryOptions={ this.props.categoryOptions}
      categoryDisabled={true}
      ownerDisabled={true}
      initialValues={{
        title: R.path([this.props.match.params.postId, 'title'], this.props.posts),
        post: R.path([this.props.match.params.postId, 'body'], this.props.posts),
        owner: R.path([this.props.match.params.postId, 'author'], this.props.posts),
        category: R.path([this.props.match.params.postId, 'category'], this.props.posts)}}
        />
    }
      </Segment>
    )
  }
}

const mapStateToProps = ({ posts, comments, categories }) => ({
  isFetchingPost: posts['isFetching'],
  posts: posts['items'],
  categoryOptions: R.map(category => ({'key': category.name,
  'text': category.name, 'value': category.name}),
  R.defaultTo([], categories.items))
})

export default withRouter(connect(mapStateToProps)(EditPost))
