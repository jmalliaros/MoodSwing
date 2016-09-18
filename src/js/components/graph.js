import React, { Component, PropTypes } from 'react'
import styles from './styles.css.js'
import Plotly from 'plotly.js/lib/core'

class Graph extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount(){

      var currentMood = [{
          x: ['Happy', 'Sad', 'Anger', 'Fear', 'Surprise', 'Neutral', 'Disgust', 'Contempt'],
          y: [0, 0, 0, 0, 0, 0, 0, 0],           
          type: 'bar',
          fill: 'tonexty'
      }];

      var moodData = [{
          x: [new Date().getTime() / 1000], 
          y: [Math.random()], 
          mode: 'lines+markers',
          type: 'scatter',
          name: 'Mood'
      }]


      var moodLayout = {
        title: 'Mood vs Time',
        xaxis: {
          title: 'Time'
        },
        yaxis: {
          title: 'Mood'
        }
      }

      var currentLayout = {
        barmode: 'group',
        title: 'Current Mood'
      }

      Plotly.plot('currentMood', currentMood, currentLayout)
      Plotly.plot('moodGraph', moodData, moodLayout)
      

      setInterval(function(){
        var update = {
          x: [[new Date().getTime() / 1000 ]],
          y: [[ Math.random() ]]
        }
        
          Plotly.extendTraces('moodGraph', update, [0], 50)
      }, 5000)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.scores) {
      var scores = nextProps.scores
      var currentLayout = {
        barmode: 'group',
        title: 'Current Mood'
      }

      var currentMood = [{
          x: ['Happy', 'Sad', 'Anger', 'Fear', 'Surprise', 'Neutral', 'Disgust', 'Contempt'],
          y: [
              scores.happiness*100,
              scores.sadness*100,
              scores.anger*100,
              scores.fear*100,
              scores.surprise*100,
              scores.neutral*100,
              scores.disgust*100,
              scores.contempt*100
            ],
          type: 'bar'
      }]

      Plotly.newPlot('currentMood', currentMood, currentLayout)
    }
  }


  render() {

    return (
      <div style={styles.graphContainer} className="container center-align">
        <div id="currentMood"></div>
        <div id="moodGraph"></div>
      </div>
    )
  }
}

export default Graph
