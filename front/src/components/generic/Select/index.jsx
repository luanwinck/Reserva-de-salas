import React from 'react'

import './style.css'

export default class Select extends React.Component {

    renderOptions() {
        return this.props.options.map((option, key) => {
            return <option key={key} value={option.value}>{option.text}</option>
        })
    }

    render() {
        return <div className="form-group">
            <label >{this.props.label}</label>
            <select name={this.props.name} onChange={this.props.handleChange} className="form-control select" >
                {this.renderOptions()}
            </select>
        </div>
    }
}