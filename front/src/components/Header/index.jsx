import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import './style.css'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldRedirectHome: false,
            shouldRedirectReserva: false,
            shouldRedirectSalas: false,
        };
    }

    _home = () => {
        if (!this.props.disabledHome) {
            this.setState({
                shouldRedirectHome: true,
            });
        }
    };

    _salas = () => {
        if (!this.props.disabledSalas) {
            this.setState({
                shouldRedirectSalas: true,
            });
        }
    }

    _reserva = () => {
        if (!this.props.disabledReserva) {
            this.setState({
                shouldRedirectReserva: true,
            });
        }
    };

    render() {
        if (this.state.shouldRedirectHome) {
            return <Redirect to="/home" />
        } else if (this.state.shouldRedirectReserva) {
            return <Redirect to="/reserva" />
        } else if (this.state.shouldRedirectSalas) {
            return <Redirect to="/salas" />
        }
        return (
            <div className="header">
                <span onClick={this._home}>Home</span>
                <span onClick={this._salas}>Salas</span>
                <span onClick={this._reserva}>Reserva</span>
                <span>Sobre</span>
            </div>
        );
    }
}

export default Header;
