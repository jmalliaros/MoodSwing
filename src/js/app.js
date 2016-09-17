import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header.js';
import SongList from './components/songlist.js';
import Graph from './components/graph.js';

ReactDOM.render(
  <div>
	  <Header/>
	  <Graph/>
	  <SongList/>
  </div>,
  document.getElementById('app-container')
)
