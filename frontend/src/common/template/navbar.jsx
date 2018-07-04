import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { logout } from '../../auth/authActions'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
  }

  changeOpen() {
      this.setState({ open: !this.state.open })
  }

  render() {
    const { name, email } = this.props.user
    return (
      <div className="navbar-custom-menu">
        <ul className="nav navbar-nav">
          <li className="dropdown messages-menu">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                <i className="fa fa-envelope-o"></i>
                <span className="label label-success">4</span>
              </a>
              <ul className="dropdown-menu">
                <li className="header">Aqui é o Header</li>
                <li>
                  <ul className="menu">
                    <li>
                      <a href="#">
                        <i className="fa fa-users text-aqua"></i> 5 new members joined today
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="footer"><a href="#">See All Messages</a></li>
              </ul>
          </li>

          <li className="dropdown notifications-menu">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
              <i className="fa fa-bell-o"></i>
              <span className="label label-warning">10</span>
            </a>
            <ul className="dropdown-menu">
              <li className="header">You have 10 notifications</li>
              <li>
                <ul className="menu">
                  <li>
                    <a href="#">
                      <i className="fa fa-users text-aqua"></i> 5 new members joined today
                    </a>
                  </li>
                </ul>
              </li>
              <li className="footer"><a href="#">View all</a></li>
            </ul>
          </li>

          <li className="dropdown tasks-menu">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
              <i className="fa fa-flag-o"></i>
              <span className="label label-danger">9</span>
            </a>
            <ul className="dropdown-menu">
              <li className="header">You have 9 tasks</li>
              <li>
                <ul className="menu">
                  <li>
                    <a href="#">
                      <h3>
                          Design some buttons
                          <small className="pull-right">20%</small>
                        </h3>
                      <div className="progress xs">
                        <div className="progress-bar progress-bar-aqua" style={{width: "20%"}} role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                          <span className="sr-only">20% Complete</span>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="footer">
                <a href="#">View all tasks</a>
              </li>
            </ul>
          </li>

          <li onMouseLeave={() => this.changeOpen()}
              className={`dropdown user user-menu ${this.state.open ? 'open' : ''}`}>
              <a href="javascript:;" onClick={() => this.changeOpen()}
                  aria-expanded={this.state.open ? 'true' : 'false'}
                  className="dropdown-toggle"
                  data-toggle="dropdown">
                  <img src="http://loremflickr.com/160/160/portrait"
                      className="user-image" alt="User Image" />
                  <span className="hidden-xs">{name}</span>
              </a>
              <ul className="dropdown-menu">
                  <li className="user-header">
                      <img src="http://loremflickr.com/160/160/portrait"
                          className="img-circle" alt="User Image" />
                      <p>{name}<small>{email}</small></p>
                  </li>
                  <li className="user-footer">
                      <div className="pull-right">
                          <a href="#" onClick={this.props.logout}
                              className="btn btn-default btn-flat">Sair</a>
                      </div>
                  </li>
              </ul>
          </li>

          <li>
            <a href="#" data-toggle="control-sidebar"><i className="fa fa-gears"></i></a>
          </li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({user: state.auth.user})
const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Navbar)