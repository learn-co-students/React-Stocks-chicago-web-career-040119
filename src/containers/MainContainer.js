import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state= {
    stocks : [],
    myStocks: [],
    sortBy: '',
    filter: ""
  }

  componentDidMount() {
    fetch("http://localhost:3000/stocks")
    .then(r => r.json())
    .then(stocks =>
      this.setState({
        stocks: stocks,
      })
    )
  }

  buyStocks = (stock) => {
    this.setState({
      myStocks: [...this.state.myStocks, stock]
    })
  }

 sellStock = (stock) => {
   if (this.state.myStocks.includes(stock)) {
     let newStocks = this.state.myStocks.filter( s => s !== stock)
       this.setState({
         myStocks : newStocks
       })
   }
 }

 handleRadio = event => {
   this.setState({
     sortBy: event.target.value
   })
 }



  render() {
    return (
      <div>
        <SearchBar
          sortBy={this.state.sortBy}
          handleRadio={this.handleRadio}
        />

          <div className="row">
            <div className="col-8">

              <StockContainer
                stocks={this.state.stocks}
                buyStocks={this.buyStocks}
                sellStock={this.sellStock}
                parent="stocks"
              />

            </div>
            <div className="col-4">

              <PortfolioContainer
                stocks={this.state.myStocks}
                sellStock={this.sellStock}
                parent="portfolio"
              />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
