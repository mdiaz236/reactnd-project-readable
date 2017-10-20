import  React, { Component } from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchPosts, votePost} from '../actions'
import PostSummary from  './PostSummary'
import SortPost from './SortPost'

import { Container, Header, Loader } from 'semantic-ui-react'


class PostList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts())
  }

  render() {
    return (
      this.props.fetching ? <div>  <Loader active inline='centered' />
</div> : (
        R.isEmpty(this.props.posts) ? <div></div> :

      <div>
        <Header as="h2" textAlign="center" style={{marginTop: '1em'}}>Posts</Header>
        <SortPost />
        <Container>
          <div>
          {R.map((post) => (
            <PostSummary key={R.prop('id', post)} post={post }
            voteClickHandler={(voteType) =>
              this.props.dispatch(votePost(R.prop('id', post), voteType))}
              />
          ), R.reverse(
            R.sortBy(
              R.prop(this.props.sortKey),
                    R.reject(R.prop('deleted'), R.values(this.props.posts)))))}
          </div>
        </Container>
      </div>
    )
  )
  }
}

const mapStateToProps = ({ posts, router, app }) => (
  {
    fetching: posts.fetching,
    posts: posts.items,
    router,
    sortKey: app.sortKey
  }
)

PostList.propTypes = {
  posts: PropTypes.object
}

export default connect(
  mapStateToProps
)(PostList)
