import React from 'react'
import { Container, Header, Segment } from 'semantic-ui-react'
import * as R from 'ramda'

const PostContent = ({ post }) => (
  <Container>
    <Segment>
      <Header as='h2'>{R.propOr('no', 'title', post)}</Header>
    </Segment>
  </Container>
)

export default PostContent
