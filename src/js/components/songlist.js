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
        <iframe src="https://embed.spotify.com/?uri=spotify:user:erebore:playlist:788MOXyTfcUb1tdw4oC7KJ" width="100%" height="80" frameborder="0" allowtransparency="true"></iframe>
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
      </div>
    );
  }
}

export default SongList