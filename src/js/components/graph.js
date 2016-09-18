import React, { Component, PropTypes } from 'react'
import styles from './styles.css.js';
import Plotly from 'plotly.js/lib/core';

class Graph extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount(){


      var currentMood = [{
          type: 'bar',
          x: ['Happy', 'Sad', 'Anger', 'Fear', 'Surprise', 'Neutral', 'Disgust', 'Contempt'],
          y: [Math.random(), Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random()],
      }];

      var moodData = [{
          x: [new Date().getTime() / 1000], 
          y: [Math.random()], 
          mode: 'lines+markers',
          type: 'scatter',
          name: 'Mood'
      }];


      var moodLayout = {
        title: 'Mood vs Time',
        xaxis: {
          title: 'Time'
        },
        yaxis: {
          title: 'Mood'
        }
      };

      var currentLayout = {
        title: 'Current Mood',
      };

      Plotly.plot('currentMood', currentMood, currentLayout);
      Plotly.plot('moodGraph', moodData, moodLayout);
      

      setInterval(function(){
        var update = {
          x: [[new Date().getTime() / 1000 ]],
          y: [[ Math.random() ]]
        };
        
          Plotly.extendTraces('moodGraph', update, [0], 50);
      }, 5000);
  }


  render() {

    return (
      <div style={styles.graphContainer} className="container">
        <div id="currentMood"></div>
        <div id="moodGraph"></div>
      </div>
    )
  }
}

export default Graph
