import React, { Component, PropTypes } from 'react'
import styles from './styles.css.js';

class SongList extends React.Component {

  constructor() {

    super()

    this.songs = {
      songs:
        [ {artist: 'Alvin', songName: 'Kung fu fighting'},
          {artist: 'Bob', songName: 'Lollipop'},
          {artist: 'Lil Wayne', songName: 'Sucker for Pain'}
        ]
    }
  }

  render() {

    return (
      <div style={styles.songList} className="container">
        <table className="striped centered responsive-table">
          <thead>
            <tr>
                <th data-field="artistName">Artist</th>
                <th data-field="songName">Song Name</th>
            </tr>
          </thead>

          <tbody>
            {this.songs.songs.map((song, index) =>
                <tr key={index}>
                  <td>{song.artist}</td>
                  <td>{song.songName}</td>
                </tr>
            )}
          </tbody>
        </table>
        <div style={styles.player} className="center-align">
          <a style={styles.spacing} className="btn-floating red"><i className="material-icons">play_arrow</i></a>
          <a style={styles.spacing} className="btn-floating yellow darken-1"><i className="material-icons">skip_next</i></a>
        </div>
      </div>
    );
  }
}

export default SongList