import React, { Component } from 'react'
import './App.css'
import NavMenu from './NavMenu'
import { Header } from 'semantic-ui-react'

class App extends Component {
  render() {
    return (
      <div className="App ui container">
        <Header as="h1" textAlign="center">
          Welcome to Readable
        </Header>
        <NavMenu />
      </div>
    )
  }
}

export default App
