import React from 'react'
import { Container, Header, Segment } from 'semantic-ui-react'
import * as R from 'ramda'

const PostContent = ({ post }) => (
  <Container>
    <Segment>
      <Header as='h2'>{R.propOr('', 'title', post)}</Header>
      <Header as='h3'>
        posted by {post.author} on {new Date(post.timestamp).toDateString()}
      </Header>
      <Header as='h4'>category: {post.category}</Header>
      <Container text>{post.body}</Container>
    </Segment>
  </Container>
)

export default PostContent
