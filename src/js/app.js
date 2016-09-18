import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header.js';
import SongList from './components/songlist.js';
import Graph from './components/graph.js';
import Video from './components/video.js';

ReactDOM.render(
  <div>
	  <Header/>
	  <Video/>
	  <SongList/>
	  <Graph/>
  </div>,
  document.getElementById('app-container')
)
