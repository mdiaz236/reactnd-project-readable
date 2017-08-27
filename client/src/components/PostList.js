import  React, { Component } from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchPosts} from '../actions'
import PostSummary from  './PostSummary'
import { Container, Header } from 'semantic-ui-react'


class PostList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts())
  }

  render() {
    return (
      <div>
        <Header as="h2" textAlign="center" style={{marginTop: '1em'}}>Posts</Header>
        <Container>
          <div>
          {R.map((post) => (
            <PostSummary key={post.id} post={post }/>
          ), R.reverse(R.sortBy(R.prop('voteScore'), R.values(this.props.posts.items))))}
          </div>
      </Container>
      </div>
    )
  }
}

const mapStateToProps = ({ posts }) => (
  {
    posts
  }
)

PostList.propTypes = {
  PostList: PropTypes.arrayOf(PropTypes.object)
}

export default connect(
  mapStateToProps
)(PostList)
