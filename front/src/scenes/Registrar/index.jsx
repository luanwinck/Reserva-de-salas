import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import { Row, Input, Button } from 'reactstrap'
import Select from '../../components/generic/Select/index'

import RegistrarUsuarioService from "../../services/RegistrarUsuarioService";

import './style.css'

export default class Registrar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shouldRedirectHome: false,
			shouldRedirectLogin: false,
			nome: '',
			email: '',
			senha: '',
			senhaRepeticao: '',
			error: false, 
		}

		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[name]: value
		})
	}

	_registrar = () => {
		const { nome, email, senha, senhaRepeticao } = this.state


		if (!nome || !email || !senha || !senhaRepeticao || senha != senhaRepeticao) {
			this.setState({error: true})
			return
		}

		this.setState({error: false})

		console.log("request")

		RegistrarUsuarioService
		.registrarUsuario(nome, email, senha)
			.then(() => {
				this.setState({
					shouldRedirectLogin: true
				});
			})
	}

	_back = () => (
		this.setState({
			shouldRedirectLogin: true
		})
	)

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
		} else if (this.state.shouldRedirectLogin) {
			return <Redirect to="/login" />
		}

		return (
			<div className="container-registrar">
				<div className="form-registrar">
					<h1>Cadastrar-se</h1>
					{this.state.error && (
            <span className="alert">Algum campo está inválido</span>
          )}
					<label className="label">Nome</label>
					<Input
						value={this.state.nome}
						name="nome"
						placeholder="Digite seu nome"
						onChange={this.handleChange}
						type="text"
						value={this.state.descricao}

					/>
					<label className="label">E-mail</label>
					<Input
						value={this.state.email}
						name="email"
						placeholder="Digite seu e-mail"
						onChange={this.handleChange}
						type="email"
					/>
					{/* <Select 
                label="Função"
                name="categoria"
                value={this.state.categoria}
                options={this.getFuncoesUsuario()}
                handdleChange={this.handdleChange} 
            /> */}
					<label className="label">Senha</label>
					<Input
						value={this.state.senha}
						name="senha"
						placeholder="Digite sua senha"
						onChange={this.handleChange}
						type="password"
					/>
					<label className="label">Digite novamente</label>
					<Input
						value={this.state.senhaRepeticao}
						name="senhaRepeticao"
						placeholder="Digite sua senha novamente"
						onChange={this.handleChange}
						type="password"
					/>
					<Button color='secundary' onClick={this._registrar}>Registrar</Button>
					<span className="link" onClick={this._back} >Voltar</span>
				</div>
			</div>
		);
	}
}
