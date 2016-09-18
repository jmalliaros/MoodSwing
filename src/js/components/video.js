import React, { Component, PropTypes } from 'react'
import TimerMixin from 'react-timer-mixin'
import jic from 'j-i-c'
import styles from './styles.css.js';

class Video extends React.Component {
  constructor(props) {
    super(props)

    this.snap = this.snap.bind(this)
    this.upload = this.upload.bind(this)
    this.snapInterval = 5000
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

    context.drawImage(video, 0, 0, 0, 0)
    var dataURI = canvas.toDataURL('img/jpeg')

    this.upload(dataURI)

    // $.ajax({
    //   method: 'POST',
    //   url: 'http://localhost:5000/images',
    //   headers: {
    //     'Content-Type': 'application/octet-stream'
    //   },
    //   data: dataURI,
    //   success: function(data, status) {
    //     console.log(data)
    //     console.log(status)
    //   },
    //   error: function(xhr, desc, err) {
    //     console.log(xhr)
    //     console.log("Desc: " + desc + "\nErr:" + err)
    //   }
    // })
  }

  upload(data) {    
    var target_img = this.refs.target_img
    var quality = 80
    var output_format = 'jpg'

    console.log(jic)
    target_img.src = jic.compress(data, quality, output_format).src  
     
    var server_endpoint = 'http://localhost:5000/images'
    var server_var_name = 'file'
    var filename = "new.jpg"
     
    var successCallback = function(response){ console.log(response) }
     
    var errorCallback = function () {
    }
     
    var duringCallback = function (progressPercent) {
    }
     
    jic.upload(target_img, server_endpoint, server_var_name, filename, successCallback, errorCallback, duringCallback, customHeaders)  
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s6">
            <video ref="video" height="480" autoPlay></video>
          </div>
          <div className="col s6">
            <canvas ref="canvas" height="480" style={styles.hidden}></canvas>
          </div>
          <img ref="target_img"></img>
        </div>
      </div>
    )
  }
}

export default Video
