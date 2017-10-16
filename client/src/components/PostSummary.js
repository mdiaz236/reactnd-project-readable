import React from 'react'
import { Grid,  Button, Item, Statistic } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import * as moment from 'moment'


const PostSummary = ({ post, voteClickHandler }) => (
  <Grid celled>
  <Grid.Column width={2}>
  <Statistic>
      <Statistic.Label>
        Votes
      </Statistic.Label>
      <Statistic.Value>
      {post.voteScore}
      </Statistic.Value>
      </Statistic>
    </Grid.Column>
    <Grid.Column textAlign='center' width={2}>
    <Button icon='arrow up' style={{margin: '1pt'}}
    onClick={() => voteClickHandler('upVote')} />
    <Button icon='arrow down' style={{margin: '1pt'}}
    onClick={() => voteClickHandler('downVote')}/>

    </Grid.Column>
    <Grid.Column width={10}>
    <Item>
    <Item.Content>
      <Link to={`/post/${post.id}`}>

        <Item.Header as='h3'>{post.title}</Item.Header>
        </Link>
      <Item.Meta>posted by {post.author} on {moment(post.timestamp).calendar()}</Item.Meta>
      <Item.Description>category: {post.category}</Item.Description>
      </Item.Content>
      </Item>
    </Grid.Column>
  </Grid>
)

export default PostSummary
