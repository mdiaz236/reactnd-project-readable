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
import { Link } from 'react-router-dom'

const PostContent = ({post, voteClickHandler, deletePostHandler}) => (
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
          <Grid.Row>{post.body}</Grid.Row>
          <br />
          <Grid.Row>
          <Link to={`/post/${post.id}/edit`}>
                <Button size='small' compact>edit post</Button>
                </Link>
            <Button size='small' compact negative
              onClick={deletePostHandler}>
            delete post
            </Button>
          </Grid.Row>
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
            <Button icon='arrow up' style={{
              margin: '1pt'
            }} onClick={() => voteClickHandler('upVote')}/>
            <Button icon='arrow down' style={{
              margin: '1pt'
            }}  onClick={() => voteClickHandler('downVote')}/>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </Segment>
  </Container>
)

export default PostContent
