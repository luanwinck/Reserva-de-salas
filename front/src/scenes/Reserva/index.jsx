import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";

import { Button, Input, Table } from "reactstrap";
import Select from "../../components/generic/Select/index";
import Header from "../../components/Header/index";
import CardSala from "../../components/CardSala/index";

import "./style.css";

import GetSalasDisponiveisService from "../../services/GetSalasDisponiveisService";
import CadastrarReservaService from "../../services/CadastrarReservaService";
import GetReservasService from "../../services/GetReservasService";

import moment from "moment";
import jwt from 'jsonwebtoken'

export default class Reserva extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldRedirectLogin: false,
      data: "",
      horaInicial: "",
      horaFinal: "",
      sala: "",
      descricao: "",
      validateDataInicial: "",
      valiadteDataFinal: "",
      salas: [],
      reservas: [],
      filter: "Próximas reservas",
    };
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.getReservas();
  }

  getReservas() {
    GetReservasService.getReservas()
      .then(result => {
        this.setState({
          reservas: result.data
        });
        console.log(result.data);
      })
      .catch(err => { });
  }

  getSalas = () => {
    if (this.verifyDateCompleted()) {
      const reserva = this.state;
      console.log(reserva);
      GetSalasDisponiveisService.getSalasDisponiveis(
        reserva.data,
        reserva.horaInicial,
        reserva.horaFinal
      )
        .then(result => {
          this.setState({
            salas: this.mapSalas(result.data)
          });
        })
        .catch(err => { });
    }
  };

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
  }

  verifyDateCompleted() {
    const reserva = this.state;

    return (
      reserva.data.length === 10 &&
      reserva.horaInicial.length === 5 &&
      reserva.horaFinal.length === 5
    );
  }

  validateDate() { }

  getCategoriesOptions() {
    return [
      {
        value: "",
        text: "Nenhuma sala selecionada"
      }
    ].concat(
      this.state.salas.map(sala => {
        return {
          value: sala.id,
          text: sala.nome
        };
      })
    );
  }

  goCadastrarReserva = () => {
    const reserva = this.state;

    console.log(reserva);

    if (
      reserva.data === "" ||
      reserva.horaInicial === "" ||
      reserva.horaFinal === "" ||
      reserva.sala === "" ||
      reserva.descricao === ""
    ) {
      return;
    }

    const token = localStorage.getItem("accessToken");

    const decoded = jwt.decode(token, { complete: true });
    const id = decoded.payload.id

    CadastrarReservaService.cadastrarReserva(
      reserva.sala,
      id,
      reserva.data,
      reserva.horaInicial,
      reserva.horaFinal,
      reserva.descricao
    )
      .then(result => {
        this.setState({
          sala: "",
          data: "",
          horaInicial: "",
          horaFinal: "",
          descricao: "",
          salas: []
        });
      })
      .catch(err => { });
    this.getReservas();
  };

  selectSala = id => {
    const salas = this.state.salas.map(sala => {
      return {
        ...sala,
        selected: sala.id === id
      };
    });

    this.setState({
      salas,
      sala: id
    });
  };

  mapSalas = salas => {
    return salas.map(sala => {
      return {
        ...sala,
        selected: false
      };
    });
  };

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
          );
        })}
      </div>
    );
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
    );
  }

  formatDate = date => {
    return moment(date.split('.')[0], "YYYY-MM-DD hh:mm:ss").subtract(3, 'hours').format("DD/MM/YYYY HH:mm");
  };

  getReservasMapeadas = () => {
    const { reservas, filter } = this.state

    const reservasMap =  reservas.map(reserva => {
      return {
        ...reserva,
        data: this.formatDate(reserva.data_inicial).split(' ')[0],
        hora_inicial: this.formatDate(reserva.data_inicial).split(' ')[1],
        hora_final: this.formatDate(reserva.data_final).split(' ')[1],
        data_final: this.formatDate(reserva.data_final),
        ano: moment(reserva.data_final).year()
      }
    })

    return filter === "Próximas reservas" ? reservasMap : reservasMap.reverse()
  }

  renderReservas() {
    const { filter } = this.state
    const data = filter === "Próximas reservas" ? moment(new Date().getTime()).format("DD/MM/YYYY HH:mm") : ''

    return (
      <tbody>
        {this.getReservasMapeadas().filter(r => r.data_final > data || r.ano > moment(new Date().getTime()).year())
          .map(reserva => {
            return (
              <tr>
                <td className="sala-coluna">{reserva.descricao}</td>
                <td className="sala-coluna">
                  {reserva.data}
                </td>
                <td className="sala-coluna">
                  {reserva.hora_inicial}
                </td>
                <td className="sala-coluna">
                  {reserva.hora_final}
                </td>
                <td className="sala-coluna">{reserva.usuario}</td>
                <td className="sala-coluna">{reserva.sala}</td>
              </tr>
            )
          })
        }
      </tbody>
    );
  }

  render() {
    return (
      <div>
        <Header disabledReserva={true} />
        <h1>Reserve uma sala</h1>
        <div className="container-reserva">
          {this.renderForm()}
          <div className="tabela-reservas">
            <Select
              options={[{ value: "Próximas reservas", text: "Próximas reservas" }, { value: "Histórico de reservas", text: "Histórico de reservas" }]}
              name="filter"
              handleChange={this.handleChange}
            />
            <Table striped>
              <thead>
                <tr className="sala-coluna">
                  <th className="sala-coluna">Descrição da reserva</th>
                  <th className="sala-coluna">Data</th>
                  <th className="sala-coluna">Hora inicial</th>
                  <th className="sala-coluna">Hora final</th>
                  <th className="sala-coluna">Usuário</th>
                  <th className="sala-coluna">Sala</th>
                </tr>
              </thead>
              {this.renderReservas()}
            </Table>
          </div>
        </div>
        {this.renderSalas()}
      </div>
    );
  }
}
