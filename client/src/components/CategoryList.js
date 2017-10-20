import  React, { Component } from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchCategoryPosts, votePost } from '../actions'
import PostSummary from  './PostSummary'
import SortPost from './SortPost'
import { Container, Header, Loader } from 'semantic-ui-react'

class CategoryList extends Component {

  componentDidMount() {
    this.props.dispatch(fetchCategoryPosts(this.props.match.params.category))
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.category !== prevProps.match.params.category) {
      this.props.dispatch(fetchCategoryPosts(this.props.match.params.category))
    }
  }

  render() {
    return (
      <div>
        <Header as="h2" textAlign="center" style={{marginTop: '1em'}}>
          {this.props.match.params.category}
        </Header>
        <SortPost />
        <Container>
          <div>
          {R.cond([
            [R.pipe(R.prop('isFetching'),R.equals(true)),
              R.always(<Loader active inline='centered' />)],
            [(x) => R.has(this.props.match.params.category, R.prop('categoryPostIds', x)),
              R.pipe(
                R.path(['categoryPostIds', this.props.match.params.category]),
                R.map((postId) => R.prop(postId, this.props.posts)),
                R.sortBy(R.prop(this.props.sortKey)),
                R.map((post) => (
                  <PostSummary key={post.id} post={post }
                  voteClickHandler={(voteType) =>
                    this.props.dispatch(votePost(post.id, voteType))} />
              )))],
            [R.T, R.pipe(R.prop('categoryPostIds'), R.keys(), R.nth(0))]])(this.props)}

          </div>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = ({ posts, app }) => (
  {
    isFetching: posts.isFetching,
    categoryPostIds: posts.categoryPostIds,
    posts: posts.items,
    sortKey: app.sortKey
  }
)

CategoryList.propTypes = {
  PostList: PropTypes.arrayOf(PropTypes.object)
}

export default connect(
  mapStateToProps
)(CategoryList)
