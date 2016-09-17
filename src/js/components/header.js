import React, { Component, PropTypes } from 'react'

class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <nav className="light-blue lighten-1" role="navigation">
        <div className="nav-wrapper container"><a id="logo-container" href="#" className="brand-logo">MoodSwing</a>
          <ul className="right hide-on-med-and-down">
            <li><a href="#">Menu</a></li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Header
