import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import Container from './container.js'
import configureStore from './configureStore.js'

let store = configureStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container/>
      </Provider>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app-container')
)



