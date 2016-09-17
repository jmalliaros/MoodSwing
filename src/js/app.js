import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header.js';
import SongList from './components/songlist.js';

ReactDOM.render(
  <div>
	  <Header/>
	  <SongList/>
  </div>,
  document.getElementById('app-container')
);
