import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import { Row, Input, Button } from 'reactstrap'

import './style.css'

export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldRedirectHome: false
    };
  }

  _login = () => {
    this.setState({
        shouldRedirectHome: true
    });
  };
  

  render() {
    if (this.state.shouldRedirectHome) {
        return <Redirect to="/home" />
    }

    return (
      <div className="container-login">
        <div className="form-login">
          <h1>Reserva de salas</h1>
          <Input
              label="E-mail"
              value={this.state.email}
              name="email"
              placeholder="Digite seu e-mail"
              handleChange={this.handleChange}
              type="email"
          />
          <Input
              label="E-mail"
              value={this.state.email}
              name="email"
              placeholder="Digite sua senha"
              handleChange={this.handleChange}
              type="password"
          />
          <Button color='secundary' onClick={this._login}>Login</Button>
          <span>Cadastre-se</span>
        </div>
      </div>
    );
  }
}
