import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import { Button, Input } from 'reactstrap'
import Select from '../../components/generic/Select/index'
import Header from '../../components/Header/index'

import './style.css'

export default class Reserva extends Component {
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


_logout = () => {
    this.setState({
        shouldRedirectLogin: true
    });
};

validateDate() {

}

getCategoriesOptions() {
    return [
        {
            value: 'Sala de reunião',
            text: 'Sala de reunião'
        },
        {
            value: 'Sala 102',
            text: 'Sala 102'
        },
        {
            value: 'Sala 103',
            text: 'Sala 103'
        }
    ]
}



render() {
if (this.state.shouldRedirectLogin) {
    return <Redirect to="/login" />
}

return (
    <div>
        <Header disabledReserva={true}/>
        <h1>Reserve uma sala</h1>
        <div className="container-reserva">
            <span>Data</span>
            <Input
                value={this.state.dataInicial}
                name="dataInicial"
                onChange={this.handleChange}
                type="date"
            />
            <span>Hora inicial</span>
            <Input
                value={this.state.dataFinal}
                name="dataFinal"
                onChange={this.handleChange}
                type="time"
            />
            <span>Hora final</span>
            <Input
                value={this.state.dataFinal}
                name="dataFinal"
                onChange={this.handleChange}
                type="time"
            />
            <Select 
                label="Salas disponíveis"
                name="categoria"
                value={this.state.categoria}
                options={this.getCategoriesOptions()}
                handdleChange={this.handdleChange} 
            />
            <span>Descrição da reserva</span>
            <Input type="textarea" name="descricao" />
        </div>
    </div>
);
  }
}
