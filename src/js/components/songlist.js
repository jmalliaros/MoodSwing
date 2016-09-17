import React, { Component, PropTypes } from 'react'

class SongList extends React.Component {
  render() {
    return (
      <div>
        <table className="striped responsive-table">
          <thead>
            <tr>
                <th data-field="artistName">Artist</th>
                <th data-field="songName">Song Name</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Alvin</td>
              <td>Kung fu fighting</td>
            </tr>
            <tr>
              <td>Alan</td>
              <td>Yellow submarine</td>
            </tr>
            <tr>
              <td>Jonathan</td>
              <td>Lollipop</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default SongList