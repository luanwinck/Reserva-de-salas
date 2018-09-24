import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import { Button, Input } from 'reactstrap'
import Select from '../../components/generic/Select/index'
import Header from '../../components/Header/index'

import './style.css'

export default class Salas extends Component {
  constructor(props) {
    super(props);
    this.state = {
        shouldRedirectLogin: false,
        dataInicial: '',
        dataFinal: '',
        validateDataInicial: '',
        valiadteDataFinal: '',
    };
    this.handleChange = this.handleChange.bind(this)
}

handleChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
        [name]: value
    })
}

render() {

return (
    <div>
        <Header disabledSalas={true}/>
        <h1>Cadastre uma sala</h1>
        <div className="container-salas">
            <span>Número da sala</span>
            <Input
                value={this.state.dataInicial}
                name="dataInicial"
                onChange={this.handleChange}
                type="number"
            />
            <span>Descrição da sala</span>
            <Input type="textarea" name="descricao" />
            <Button color="primary">Adicionar</Button>
        </div>
    </div>
);
  }
}
