import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { Row, Input, Button } from "reactstrap";

import LoginService from "../../services/LoginService";

import "./style.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldRedirectHome: false,
      shouldRedirectRegistrar: false,
      email: '', 
      senha: '',
      error: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  _login = () => {
    this.setState({
      shouldRedirectHome: true
    });
  };

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  _onClickLoginButton = () => {
    const account = this.state

    if (!account.email || !account.senha) {
      return
    }

    LoginService.login(account.email, account.senha)
      .then(result => {
        localStorage.setItem("accessToken", result.data.token);
        this.setState({
          shouldRedirectHome: true,
          error: false
        });
      })
      .catch(err => {
        this.setState({
          error: true
        });
      });
  };

  _registrar = () => {
    this.setState({
      shouldRedirectRegistrar: true
    });
  };

  render() {
    if (this.state.shouldRedirectHome) {
      return <Redirect to="/home" />;
    } else if (this.state.shouldRedirectRegistrar) {
      return <Redirect to="/registrar" />;
    }

    return (
      <div className="container-login">
        <div className="form-login">
          <h1>Reserva de salas</h1>
          {this.state.error && (
            <span className="alert">Email ou senha incorretos</span>
          )}
          <Input
            label="E-mail"
            value={this.state.email}
            name="email"
            placeholder="Digite seu e-mail"
            onChange={this.handleChange}
            type="email"
          />
          <Input
            value={this.state.senha}
            name="senha"
            placeholder="Digite sua senha"
            onChange={this.handleChange}
            type="password"
          />
          <Button color="secundary" onClick={this._onClickLoginButton}>
            Login
          </Button>
          <span className="link" onClick={this._registrar}>
            Cadastre-se
          </span>
        </div>
      </div>
    );
  }
}
