import  React, { Component } from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchCategoryPosts} from '../actions'
import PostSummary from  './PostSummary'
import { Container, Header } from 'semantic-ui-react'

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
        <Container>
          <div>
          {R.cond([
            [R.pipe(R.prop('isFetching'),R.equals(true)), R.always(<div>loading</div>)],
            [(x) => R.has(this.props.match.params.category, R.prop('categoryPostIds', x)),
              R.pipe(R.path(['categoryPostIds', this.props.match.params.category]),
              R.map((postId) => (
                  <PostSummary key={postId} post={R.prop(postId, this.props.posts) }/>
              )))],
            [R.T, R.pipe(R.prop('categoryPostIds'), R.keys(), R.nth(0))]])(this.props)}

          </div>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = ({ posts }) => (
  {
    isFetching: posts.isFetching,
    categoryPostIds: posts.categoryPostIds,
    posts: posts.items
  }
)

CategoryList.propTypes = {
  PostList: PropTypes.arrayOf(PropTypes.object)
}

export default connect(
  mapStateToProps
)(CategoryList)
