import React, { Component, PropTypes } from 'react'
import styles from './styles.css.js';
import Plotly from 'plotly.js/lib/core';

class Graph extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount(){

      var mood1 = {
          x: [1, 2, 3, 4], 
          y: [10, 15, 13, 17], 
          mode: 'lines+markers',
          name: 'Mood 1'
        };

      var mood2 = {
        x: [1, 2, 3, 4], 
        y: [16, 5, 11, 9], 
        mode: 'lines+markers',
        name: 'Mood 2'
      };

      var layout = {
        title: 'Mood vs Time',
        xaxis: {
          title: 'Time'
        },
        yaxis: {
          title: 'Mood'
        }
      };

      var data = [mood1, mood2];
      Plotly.plot('moodGraph', data, layout); 

      setInterval(function(){
        var update = {
          x: [[ new Date().getTime() / 1000 ]],
          y: [[ Math.random() ]]
        };
        
          Plotly.extendTraces('moodGraph', update, [0], 10);
      }, 1000);
  }


  render() {

    return (
      <div style={styles.graphContainer} className="container">
        <div id="moodGraph"></div>
      </div>
    )
  }
}

export default Graph
