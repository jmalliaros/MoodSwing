import Webcam from 'react-webcam'
import React, { Component, PropTypes } from 'react'
import TimerMixin from 'react-timer-mixin';

class Video extends React.Component {
  constructor(props) {
    super(props)

    this.snap = this.snap.bind(this)
    this.snapInterval = 5000
  }

  componentDidMount() {
    var video = this.refs.video

    // Get access to the camera
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
      .then(function(stream) {
        video.src = window.URL.createObjectURL(stream);
        video.play();
      });
    }

    TimerMixin.setInterval(this.snap, this.snapInterval)
  }

  snap() {
    var video = this.refs.video
    var canvas = this.refs.canvas
    var context = canvas.getContext('2d')
    var button = this.refs.snapButton

    context.drawImage(video, 0, 0, 640, 480)
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s6">
            <video ref="video" width="640" height="480" autoPlay></video>
          </div>
          <div className="col s6">
            <canvas ref="canvas" width="640" height="480"></canvas>
          </div>
        </div>
      </div>
    )
  }
}

export default Video
