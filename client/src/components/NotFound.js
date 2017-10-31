import React from 'react'
import { Container, Header, Icon } from 'semantic-ui-react'

const NotFound = () => (
  <Container textAlign='center'>
  <Header as='h1' style={{margin: 10}}>
    Eep! That doesn't seem to be here...
    </Header>
    <Icon size='massive' color='yellow' name='lemon' />
   </Container>
)

export default NotFound
