import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state= {
    stocks : [],
    myStocks: [],
    sortBy: '',
    filters: {
      type: "All"
    }
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

///////radio event listener///////
 handleRadio = event => {
   this.setState({
     sortBy: event.target.value
   })
 }

/////filtering event listener ///////

 handleFilter = (e) => {
   this.setState({
     filters : {
       type: e.target.value}
     })
 }


 chooseStocks = () => {
   //////for dropdown selection filtering////
   console.log(this.state.filters.type)
   console.log(this.state.sortBy)

   let tempStocks = [...this.state.stocks]

    if (this.state.filters.type === "All") {
      return tempStocks
     }
     else {
       return tempStocks = tempStocks.filter(stock => stock.type === this.state.filters.type
     )}

    if (this.sate.sortBy === "Alphabetically") {
      return tempStocks.sort((stockA, stockB) => stockA.name.localeCompare(stockB.name))
    }
    else if(this.state.sortBy === "Price"){
      return tempStocks.sort((stockA, stockB) => stockA.price - stockB.price)
    } else{
      return tempStocks
    }
 }


  render() {

    return (
      <div>
        <SearchBar
          sortBy={this.state.sortBy}
          handleRadio={this.handleRadio}
          handleFilter={this.handleFilter}
          filters={this.state.filters}
          value={this.state.filters.type}
        />

          <div className="row">
            <div className="col-8">

              <StockContainer
                stocks={this.chooseStocks()}
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
