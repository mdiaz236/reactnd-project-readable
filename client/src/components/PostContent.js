import React from 'react'
import {
  Button,
  Container,
  Grid,
  Header,
  Segment,
  Statistic
} from 'semantic-ui-react'
import * as R from 'ramda'
import * as moment from 'moment'

const PostContent = ({post}) => (
  <Container>
    <Segment>
      <Grid>

        <Grid.Column width={12}>

          <Header as='h2'>{R.propOr('', 'title', post)}</Header>
          <Header as='h3'>
            posted by {post.author}
            on {moment(post.timestamp).calendar()}
          </Header>
          <Header as='h4'>category: {post.category}</Header>
          <Container text>{post.body}</Container>
        </Grid.Column>
        <Grid.Column textAlign='center' width={4}>
          <Grid.Row>
            <Statistic>
              <Statistic.Label>
                Votes
              </Statistic.Label>
              <Statistic.Value>
                {post.voteScore}
              </Statistic.Value>
            </Statistic>
          </Grid.Row>
          <Grid.Row>
            <Button positive icon='arrow up' style={{
              margin: '1pt'
            }}/>
            <Button negative icon='arrow down' style={{
              margin: '1pt'
            }}/>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </Segment>
  </Container>
)

export default PostContent
