import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import Header from './components/header.js'
import Video from './components/video.js'

ReactDOM.render(
  <div>
    <Header/>
    <Video/>
  </div>,
  document.getElementById('app-container')
)
