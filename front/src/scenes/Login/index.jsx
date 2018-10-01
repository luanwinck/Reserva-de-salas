import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import { Row, Input, Button } from 'reactstrap'

import './style.css'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldRedirectHome: false,
      shouldRedirectRegistrar: false,
    };
  }

  _login = () => {
    this.setState({
        shouldRedirectHome: true
    });
  };

  _registrar = () => {
    this.setState({
        shouldRedirectRegistrar: true
    });
  };
  

  render() {
    if (this.state.shouldRedirectHome) {
        return <Redirect to="/home" />
    } else if (this.state.shouldRedirectRegistrar) {
      return <Redirect to="/registrar" />
  }

    return (
      <div className="container-login">
        <div className="form-login">
          <h1>Reserva de salas</h1>
          {/* <span className="alert">Email ou senha incorretos</span> */}
          <Input
              label="E-mail"
              value={this.state.email}
              name="email"
              placeholder="Digite seu e-mail"
              handleChange={this.handleChange}
              type="email"
          />
          <Input
              value={this.state.email}
              name="email"
              placeholder="Digite sua senha"
              handleChange={this.handleChange}
              type="password"
          />
          <Button color='secundary' onClick={this._login}>Login</Button>
          <span className="link" onClick={this._registrar}>Cadastre-se</span>
        </div>
      </div>
    );
  }
}
