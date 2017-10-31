import React from 'react'
import { Grid,  Button, Item, Statistic } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import * as moment from 'moment'


const PostSummary = ({ post, voteClickHandler, deleteHandler }) => (
  <Grid celled container stacking>
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
    <Grid.Column width={9}>
    <Item>
    <Item.Content>
      <Link to={`/post/${post.id}`}>

        <Item.Header as='h3'>{post.title}</Item.Header>
        </Link>
      <Item.Meta>posted by {post.author} on {moment(post.timestamp).calendar()}</Item.Meta>
      <Item.Description>
        category: <Link to={`/category/${post.category}`}>
                    {post.category}
                  </Link>
        </Item.Description>
        <Item.Description>
          {post.commentCount === 1 ? '1 comment'
          : `${post.commentCount} comments`}
        </Item.Description>
      </Item.Content>
      </Item>
    </Grid.Column>
      <Grid.Column width={3} textAlign='center'>
      <Link to={`/post/${post.id}/edit`}>
        <Button size='small' compact fluid style={{margin: '2pt'}}>
        edit post</Button>
      </Link>
      <Button size='small' compact fluid negative style={{margin: '2pt'}}
        onClick={deleteHandler}>
        delete post
      </Button>
      </Grid.Column>
  </Grid>
)

export default PostSummary
