import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
          {this.props.myPortofolio.map(stock =>
            < Stock
            stock={stock}
            removeFromPortofolio={this.props.removeFromPortofolio}
            parent='portofolio'/>)}
      </div>
    );
  }

}

export default PortfolioContainer;
