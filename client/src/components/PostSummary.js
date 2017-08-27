import React from 'react'
import { Grid,  Button, Item, Statistic } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import * as moment from 'moment'


const PostSummary = (props) => (
  <Grid equal celled>
  <Grid.Column width={2}>
  <Statistic>
      <Statistic.Label>
        Votes
      </Statistic.Label>
      <Statistic.Value>
      {props.post.voteScore}
      </Statistic.Value>
      </Statistic>
    </Grid.Column>
    <Grid.Column textAlign='center' width={2}>
    <Button positive icon='arrow up' style={{margin: '1pt'}}/>
    <Button negative icon='arrow down' style={{margin: '1pt'}}/>

    </Grid.Column>
    <Grid.Column width={10}>
    <Item>
    <Item.Content>
      <Link to={`/post/${props.post.id}`}>
        <Item.Header as='h3'>{props.post.title}</Item.Header>
      </Link>
      <Item.Meta>posted by {props.post.author} on {moment(props.post.timestamp).calendar()}</Item.Meta>
      <Item.Description>category: {props.post.category}</Item.Description>
      </Item.Content>
      </Item>
    </Grid.Column>
  </Grid>
)

export default PostSummary
