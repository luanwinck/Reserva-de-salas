import React, { Component } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom'

import './App.css';

import axios from 'axios'

import Loading from './components/generic/Loading/index'
import Home from './scenes/Home/index'
import Login from './scenes/Login/index'
import Reserva from './scenes/Reserva/index'
import Salas from './scenes/Salas/index'
import Registrar from './scenes/Registrar/index'

class App extends Component {

  constructor() {
    super()
    this.axiosConfig()
    this.state = {
      loading: false
    };

    this.token = localStorage.getItem('accessToken')
  }


  axiosConfig() {
    const self = this
    axios.interceptors.request.use((config) => {
      self.toggleLoading()
      return config
    });

    axios.interceptors.response.use((response) => {
      self.toggleLoading()
      return response;
    }, (error) => {
      self.toggleLoading()
      return Promise.reject(error)
    })
  }

  toggleLoading() {
    this.setState({
      loading: !this.state.loading
    });
  }


  render() {
    return (
      <div className="App">
        {this.state.loading && <Loading />}
        {!this.token && <Redirect to="/login" />}

        <Switch>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/registrar" component={Registrar}/>
            <Route exact path="/reserva" component={Reserva}/>
            <Route exact path="/salas" component={Salas}/>

            <Redirect to="/login" />
        </Switch>
      </div>
    );
  }

}

export default App;
