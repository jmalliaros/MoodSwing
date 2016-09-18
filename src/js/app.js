import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header.js';
import Graph from './components/graph.js';
import Video from './components/video.js';
import styles from './components/styles.css.js';

ReactDOM.render(
  <div className="column">
	  <Header/>
	  <Video/>
	  <Graph/>
  </div>,
  document.getElementById('app-container')
)
