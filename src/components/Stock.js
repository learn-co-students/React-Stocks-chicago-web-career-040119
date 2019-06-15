import React, {Fragment} from 'react'

const Stock = (props) => (

  <Fragment>
    <div>

      <div className="card">
        <div className="card-body" >
          <h5 className="card-title">{
              props.stock.name
            }</h5>
          <p className="card-text">{
              props.stock.ticker
            }</p>
            <p className="card-text">{
                props.stock.price
              }</p>
            <button onClick={props.parent === 'stock' ?
              () => props.addToPortofolio(props.stock)
            : () => props.removeFromPortofolio(props.stock)} >Sell/Buy Stock!</button>
        </div>
      </div>


    </div>
  </Fragment>
);

export default Stock
