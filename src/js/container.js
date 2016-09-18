import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Header from './components/header.js'
import SongList from './components/songlist.js'
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
        <SongList/>
        <Graph scores={ this.props.scores }/>
      </div>
    )
  }
}

Container.propTypes = {
  scores: PropTypes.object,
  faceRectangle: PropTypes.object,
  songList: PropTypes.array
}

function mapStateToProps(state) {
  return {
    scores: state.scores,
    faceRectangle: state.faceRectangle,
    songList: state.songList
  }
}

export default connect(mapStateToProps)(Container)
