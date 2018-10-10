import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import { Button, Input } from 'reactstrap'
import Select from '../../components/generic/Select/index'
import Header from '../../components/Header/index'
import CardSala from '../../components/CardSala/index'

import './style.css'

import GetSalasDisponiveisService from '../../services/GetSalasDisponiveisService'
import CadastrarReservaService from '../../services/CadastrarReservaService'

export default class Reserva extends Component {
  constructor(props) {
    super(props);
    this.state = {
        shouldRedirectLogin: false,
        data: '',
        horaInicial: '',
        horaFinal: '',
        sala: '',
        descricao: '',
        validateDataInicial: '',
        valiadteDataFinal: '',
        salas: [],
    };
    this.handleChange = this.handleChange.bind(this)
}

getSalas = () => {
	if (this.verifyDateCompleted()) {
		const reserva = this.state
		console.log(reserva)
		GetSalasDisponiveisService
				.getSalasDisponiveis(reserva.data, reserva.horaInicial, reserva.horaFinal)
				.then((result) => {
						this.setState({
								salas: this.mapSalas(result.data)
						})
				}).catch((err) => {
				})
	}  
}

handleChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
        [name]: value
    })
}

verifyDateCompleted() {
    const reserva = this.state

    return (reserva.data.length === 10 &&
        reserva.horaInicial.length === 5 &&
        reserva.horaFinal.length === 5
    ) 
}

validateDate() {
    
}

getCategoriesOptions() {
    return [{
            value: '',
            text: 'Nenhuma sala selecionada',
        }].concat(
    this.state.salas.map(sala => {
        return {
            value: sala.id,
            text: sala.nome,
        }
    }))
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

selectSala = id => {
	const salas = 
		this.state.salas.map(sala => {
			return {
				...sala,
				selected: sala.id === id
			}
		})
	
	this.setState({
		salas,
		sala: id
	})
}

mapSalas = salas => {
	return salas.map(sala => {
		return {
			...sala,
			selected: false,
		}
	})
}

renderSalas() {
	return (
		<div className="container-salas-disponiveis">
			{this.state.salas.map(sala => {
				return (
					<CardSala
							id={sala.id}
							titulo={sala.nome}
							descricao={sala.descricao}
							selectSala={this.selectSala}
							selected={sala.selected}
					/>
				)
			})}
		</div>
	)
}

renderForm() {
	return (
		<div className="container-form">
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
				<Button 
						className="button-save-sala" 
						color="secundary" 
						onClick={this.getSalas}
				>
						Buscar
				</Button>
				{/* <Select 
						label="Salas disponíveis"
						name="sala"
						value={this.state.sala}
						options={this.getCategoriesOptions()}
						handdleChange={this.handleChange} 
				/> */}
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
	)
}

render() {
    return (
        <div>
            <Header disabledReserva={true}/>
            <h1>Reserve uma sala</h1>
            <div className="container-reserva">
                {this.renderForm()}
                {this.renderSalas()}
            </div>
        </div>
    );
  }
}
