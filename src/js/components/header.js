import React, { Component, PropTypes } from 'react'

class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <nav role="navigation">
        <div className="nav-wrapper container"><a id="logo-container" href="#" className="brand-logo">MoodSwing</a>
        </div>
      </nav>
    )
  }
}

export default Header
