import  React from 'react'
import { connect } from 'react-redux'
import { Container, Dropdown } from 'semantic-ui-react'
import { updateSort } from '../actions'

const sortOptions = [
  {
    text: 'Vote Score (highest to lowest)',
    value: 'voteScore'
  },
  {
    text: 'Posting Date (most recent first)',
    value: 'timestamp'
  }
]
const SortPost = (props) => (
  <Container textAlign='right'>
  sorted by <Dropdown inline
 icon='sort'   className='icon'
   options={sortOptions}
  value={props.sortKey}
  onChange={(e, v) => props.dispatch(updateSort(v.value))}/>
  </Container>
)

const mapStateToProps = ({ app }) => (
  {
    sortKey: app.sortKey
  }
)

export default connect(
  mapStateToProps
)(SortPost)
