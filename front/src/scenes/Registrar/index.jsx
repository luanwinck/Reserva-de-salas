import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import { Row, Input, Button } from 'reactstrap'
import Select from '../../components/generic/Select/index'

import './style.css'

export default class Registrar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldRedirectHome: false,
    };
  }

  _registrar = () => {
    this.setState({
        shouldRedirectHome: true
    });
  };
  
  getFuncoesUsuario() {
    return [
        {
            value: 'Aluno',
            text: 'Aluno'
        },
        {
            value: 'Professor',
            text: 'Professor'
        },
        {
            value: 'Coordenador',
            text: 'Coordenador'
        }
    ]
}

  render() {
    if (this.state.shouldRedirectHome) {
        return <Redirect to="/home" />
    }

    return (
      <div className="container-registrar">
        <div className="form-registrar">
          <h1>Cadastrar-se</h1>
          <label className="label">Nome</label>
          <Input
              value={this.state.email}
              name="email"
              placeholder="Digite seu e-mail"
              handleChange={this.handleChange}
              type="email"
          />
          <label className="label">E-mail</label>
          <Input
              value={this.state.email}
              name="email"
              placeholder="Digite seu e-mail"
              handleChange={this.handleChange}
              type="email"
          />
          <Select 
                label="Função"
                name="categoria"
                value={this.state.categoria}
                options={this.getFuncoesUsuario()}
                handdleChange={this.handdleChange} 
            />
          <label className="label">Senha</label>
          <Input
              value={this.state.email}
              name="email"
              placeholder="Digite sua senha"
              handleChange={this.handleChange}
              type="password"
          />
          <label className="label">Digite novamente</label>
          <Input
              value={this.state.email}
              name="email"
              placeholder="Digite sua senha"
              handleChange={this.handleChange}
              type="password"
          />
          <Button color='secundary' onClick={this._registrar}>Registrar</Button>
          <span className="link">Voltar</span>
        </div>
      </div>
    );
  }
}
