import React, { Component, PropTypes } from 'react'
import TimerMixin from 'react-timer-mixin'
import jic from 'j-i-c'
import styles from './styles.css.js';

class Video extends React.Component {
  constructor(props) {
    super(props)

    this.snap = this.snap.bind(this)
    this.snapInterval = 6000
  }

  componentDidMount() {
    var video = this.refs.video

    // Get access to the camera
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
      .then(function(stream) {
        video.src = window.URL.createObjectURL(stream)
        video.play()
      })
    }

    TimerMixin.setInterval(this.snap, this.snapInterval)
  }

  snap() {
    var video = this.refs.video
    var canvas = this.refs.canvas
    var context = canvas.getContext('2d')
    var imageUpload = this.refs.image_upload

    context.drawImage(video, 0, 0, 300, 300)
    var dataURI = canvas.toDataURL('img/jpg', 0.1)

    $.post(
      'http://localhost:5000/images',
      {
        imageURI: dataURI
      }
    )
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s6">
            <video ref="video" height="480" autoPlay></video>
          </div>
          <div className="col s6">
            <canvas ref="canvas" height="300" width="300" style={styles.hidden}></canvas>
          </div>
          <img ref="target_img"></img>
        </div>
      </div>
    )
  }
}

export default Video
