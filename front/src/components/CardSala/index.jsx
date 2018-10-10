import React from 'react'

import './style.css'

export default class  extends React.Component {
  constructor(props) {
    super(props)
  }

  cardSelected() {
    return this.props.selected ? "card text-white bg-dark mb-3" : "card bg-light mb-3"
  }

  render() {
    const { id } = this.props

    return (
      <div className={`container-card-sala ${this.cardSelected()}`} onClick={() => this.props.selectSala(id)}>
        <div className="card-header"><b>{this.props.titulo}</b></div>
        <div className="card-body">
          {/* <h5 className="card-title">Light card title</h5> */}
          <p className="card-text">
            {this.props.descricao}
          </p>
        </div>
      </div>
    )
  }
}