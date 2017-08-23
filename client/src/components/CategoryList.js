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
          {R.map((post) => (
              <PostSummary key={post.id} post={post }/>
          ), R.propOr([], this.props.match.params.category,
            this.props.categoryPosts))}
          </div>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = ({ posts }) => (
  {
    categoryPosts: posts.categoryPosts
  }
)

CategoryList.propTypes = {
  PostList: PropTypes.arrayOf(PropTypes.object)
}

export default connect(
  mapStateToProps
)(CategoryList)
