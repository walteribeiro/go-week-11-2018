import React, { Component } from 'react'
import twitterLogo from '../../assets/twitter.svg'
import './Login.css'

export default class Login extends Component {
  state = {
    username: ''
  }

  componentDidMount = () => {
    const username = localStorage.getItem('@GoTwitter:username')

    if (username) {
      this.props.history.push('/timeline')
    }
  }

  handleSubmit = evt => {
    evt.preventDefault()
    const { username } = this.state

    if (!username.length) return

    localStorage.setItem('@GoTwitter:username', username)

    this.props.history.push('/timeline')
  }

  handleInputChange = evt => {
    this.setState({ username: evt.target.value })
  }

  render() {
    return (
      <div className="login-wrapper">
        <img src={twitterLogo} alt="Go Twitter" />
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.username}
            onChange={this.handleInputChange}
            type="text"
            placeholder="Nome de usuário"
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    )
  }
}
