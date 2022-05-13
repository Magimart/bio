import React, { Component } from 'react'

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="https://art3-studio.vercel.app/magima/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="https://res.cloudinary.com/magimaart/image/upload/v1642342479/portfolioApp/avatar/cafjjzdp48id813oxupl.jpg" width="30" height="30" className="d-inline-block align-top" alt="" />
          &nbsp; Yield-Farming
        </a>

        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <span className="accountsBalanceIcon">
              Account bal: <span className="accountBalFigure">{this.props.account}</span>
            </span>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
