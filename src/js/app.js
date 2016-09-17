import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import Header from './components/header.js'
import Video from './components/video.js'
import SongList from './components/songlist.js'

ReactDOM.render(
  <div>
    <Header/>
    <Video/>
	  <SongList/>
  </div>,
  document.getElementById('app-container')
)
