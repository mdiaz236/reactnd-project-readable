import React from 'react'

const Post = (props) => (
  <div>
    <h3>{props.post.title}</h3>
    <p>{props.post.body}</p>
  </div>
)

export default Post
