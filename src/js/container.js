import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Header from './components/header.js'
import Graph from './components/graph.js'
import Video from './components/video.js'
import { updateState} from './actions'

class Container extends Component {
  constructor(props) {
    super(props)

    this.updateState = this.updateState.bind(this)
  }

  updateState(data) {
    const { dispatch } = this.props
    dispatch(updateState(data))
  }

  render() {
    return (
      <div>
        <Header/>
        <Video updateState={ this.updateState }/>
        <Graph scores={ this.props.scores } mood={ this.props.mood } time={ this.props.time }/>
      </div>
    )
  }
}

Container.propTypes = {
  scores: PropTypes.object,
  faceRectangle: PropTypes.object,
  mood: PropTypes.number,
  time: PropTypes.time,
  songList: PropTypes.array
}

function mapStateToProps(state) {
  return {
    scores: state.scores,
    faceRectangle: state.faceRectangle,
    mood: state.mood,
    time: state.time,
    songList: state.songList
  }
}

export default connect(mapStateToProps)(Container)
