import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import { Button, Input } from 'reactstrap'
import Select from '../../components/generic/Select/index'
import Header from '../../components/Header/index'

import { Table } from 'reactstrap';

import './style.css'

import GetSalasService from '../../services/GetSalasService'
import CadastrarAlteraSala from '../../services/CadastrarAlterarSalaService'

export default class Salas extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id: '',
        nome: '',
        descricao: '',
        textButton: 'Adicionar',
        salas: []
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
            console.log(result.data)
        }).catch((err) => {
        })
}

goCadastrarAlterarProduto = () => {
    const sala = this.state

    if (sala.nome === '' || sala.descricao === '') { return }

    CadastrarAlteraSala
        .cadastrarAlterarSala(sala.id, sala.nome, sala.descricao)
        .then((result) => {
            this.setState({
                id: '',
                nome: '',
                descricao: '',
                textButton: 'Adicionar',
            })
            console.log(result.data)
        }).catch((err) => {
        })

    this.getSalas()
}

onClickAlterarSala(sala) {
    this.setState({
        id: sala.id,
        nome: sala.nome,
        descricao: sala.descricao,
        textButton: 'Alterar'
    })
}

renderSalas() {
    return(
        <tbody>
            {this.state.salas.map(sala => {
                return <tr>
                    <td className="sala-coluna">{sala.nome}</td>
                    <td className="sala-coluna">{sala.descricao}</td>
                    <td className="sala-coluna">
                        <span className="button-sala" onClick={() => this.onClickAlterarSala(sala)}>Editar</span>
                        <br/><br/>
                        <span className="button-sala">Excluir</span>
                    </td>
                </tr>
            })}
        </tbody>
    )
}

render() {

return (
    <div>
        <Header disabledSalas={true}/>
        <h1>Cadastre uma sala</h1>
        <div className="container-salas">
            <div className="container-form-salas">
                <span>Número/Nome da sala</span>
                <Input
                    value={this.state.nome}
                    name="nome"
                    onChange={this.handleChange}
                    type="text"
                />
                <span>Descrição da sala</span>
                <Input
                    value={this.state.descricao}
                    name="descricao"
                    onChange={this.handleChange}
                    type="textarea"
                />
                <Button 
                    className="button-save-sala" 
                    color="secundary" 
                    onClick={this.goCadastrarAlterarProduto}
                >
                    {this.state.textButton}
                </Button>

                
            </div>
            <div className="container-tabela-salas">
                <Table striped>
                    <thead>
                    <tr className="sala-coluna">
                        <th className="sala-coluna">Número/Nome</th>
                        <th className="sala-coluna">Descrição</th>
                        <th className="sala-coluna">Editar/Remover</th>
                    </tr>
                    </thead>
                    {this.renderSalas()}
                </Table>
            </div>
        </div>
    </div>
);
  }
}
