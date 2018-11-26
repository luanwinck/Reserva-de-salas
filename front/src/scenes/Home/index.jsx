import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { Button } from "reactstrap";
import Header from "../../components/Header/index";

import "./style.css";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldRedirectLogin: false,
      dataInicial: "",
      dataFinal: "",
      validateDataInicial: "",
      valiadteDataFinal: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  _logout = () => {
    localStorage.removeItem('accessToken')
    this.setState({
      shouldRedirectLogin: true
    });
  };

  validateDate() {}

  getCategoriesOptions() {
    return [
      {
        value: "Sala de reunião",
        text: "Sala de reunião"
      },
      {
        value: "Sala 102",
        text: "Sala 102"
      },
      {
        value: "Sala 103",
        text: "Sala 103"
      }
    ];
  }

  render() {
    if (this.state.shouldRedirectLogin) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="container-home">
        <Header disabledHome={true} />
        <div className="content-home">
          <h1>RESERVA DE SALAS</h1>
          <span onClick={this._logout}>Logout</span>
        </div>
        <div className="content-home-secondary" />
      </div>
    );
  }
}
