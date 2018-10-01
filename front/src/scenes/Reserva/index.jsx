import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import { Button, Input } from 'reactstrap'
import Select from '../../components/generic/Select/index'
import Header from '../../components/Header/index'

import './style.css'

import GetSalasService from '../../services/GetSalasService'
import CadastrarReservaService from '../../services/CadastrarReservaService'

export default class Reserva extends Component {
  constructor(props) {
    super(props);
    this.state = {
        shouldRedirectLogin: false,
        data: '',
        horaInicial: '',
        horaFinal: '',
        sala: 1,
        descricao: '',
        validateDataInicial: '',
        valiadteDataFinal: '',
        salas: [],
    };
    this.handleChange = this.handleChange.bind(this)
}

componentDidMount() {
    this.getSalas()
}

getSalas() {
    GetSalasService
        .getSalas()
        .then((result) => {
            this.setState({
                salas: result.data
            })
        }).catch((err) => {
        })
}

handleChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
        [name]: value
    })
    console.log(this.state.sala)
}


_logout = () => {
    this.setState({
        shouldRedirectLogin: true
    });
};

validateDate() {

}

getCategoriesOptions() {
    return this.state.salas.map(sala => {
        return {
            value: sala.id,
            text: sala.nome,
        }
    })
}

goCadastrarReserva = () => {
    const reserva = this.state

    console.log(reserva)

    if (reserva.data === '' || 
        reserva.horaInicial === '' ||
        reserva.horaFinal === '' ||
        reserva.sala === '' ||
        reserva.descricao === ''
    ) { return }

    CadastrarReservaService
        .cadastrarReserva(reserva.sala, 1, reserva.data, reserva.horaInicial, reserva.horaFinal, reserva.descricao)
        .then((result) => {
            this.setState({
                sala: '',
                data: '',
                horaInicial: '',
                horaFinal: '',
                descricao: '',
            })
            console.log(result.data)
        }).catch((err) => {
        })
}

render() {
    return (
        <div>
            <Header disabledReserva={true}/>
            <h1>Reserve uma sala</h1>
            <div className="container-reserva">
                <span>Data</span>
                <Input
                    value={this.state.data}
                    name="data"
                    onChange={this.handleChange}
                    type="date"
                />
                <span>Hora inicial</span>
                <Input
                    value={this.state.horaInicial}
                    name="horaInicial"
                    onChange={this.handleChange}
                    type="time"
                />
                <span>Hora final</span>
                <Input
                    value={this.state.horaFinal}
                    name="horaFinal"
                    onChange={this.handleChange}
                    type="time"
                />
                <Select 
                    label="Salas disponíveis"
                    name="sala"
                    value={this.state.sala}
                    options={this.getCategoriesOptions()}
                    handdleChange={this.handleChange} 
                />
                <span>Descrição da reserva</span>
                <Input
                    value={this.state.descricao}
                    name="descricao"
                    onChange={this.handleChange}
                    type="textarea"
                />
                <Button 
                    className="button-save-sala" 
                    color="secundary" 
                    onClick={this.goCadastrarReserva}
                >
                    Cadastrar
                </Button>
            </div>
        </div>
    );
  }
}
