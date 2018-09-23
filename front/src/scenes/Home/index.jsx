import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import { Button, Input } from 'reactstrap'

import './style.css'

export default class Home extends Component {
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


render() {
if (this.state.shouldRedirectLogin) {
    return <Redirect to="/login" />
}

return (
    <div>
        <h1>Home</h1>
        {/* <Button color='danger' onClick={this._logout}>Logout</Button> */}
        <div className="container-home">
        <span>Data inicial</span>
        <Input
            value={this.state.dataInicial}
            name="dataInicial"
            onChange={this.handleChange}
            type="datetime-local"
        />
        <span>Data final</span>
        <Input
            value={this.state.dataFinal}
            name="dataFinal"
            onChange={this.handleChange}
            type="datetime-local"
        />
        </div>
        <Button color='primary' onClick={this.validateDate}>Data</Button>
    </div>
);
  }
}
