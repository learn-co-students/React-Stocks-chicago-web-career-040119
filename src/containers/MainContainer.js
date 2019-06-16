import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  constructor() {
      super()
      this.state = {
        stocks: [],
        myPortofolio: [],
        sortBy: '',
        filterTerm: '',
        selectSort: "All"
      }
  }

  componentDidMount() {
    fetch('http://localhost:3000/stocks')
    .then(resp => resp.json())
    .then(stocks => this.setState({
      stocks: stocks
    }))
  }

  //when click on stock add it to myPortofolio
  addToPortofolio =(stock)=> {
    if (!this.state.myPortofolio.includes(stock)) {
      let newSelectedStocks = [...this.state.myPortofolio, stock]
      this.setState({
        myPortofolio: newSelectedStocks
      })
    }
  }

  removeFromPortofolio =(stock)=> {
    if (this.state.myPortofolio.includes(stock)) {
      let filtered = this.state.myPortofolio.filter(s => s!==stock)
      this.setState({
        myPortofolio: filtered
      })
    }
  }

  handleRadio =(event)=> {
    this.setState({
      sortBy: event.target.value
    })
  }

  handleSelect =(event)=> {
    this.setState({
      selectSort: event.target.value
    })
  }

  selectStock =()=> {
    // make a selected copy of the stock array
    let selectedStocks = [...this.state.stocks]
    // if selectSort becomes "All"
    if (this.state.selectSort === "All") {
    // the selected stocks are all stocks
      selectedStocks = [...this.state.stocks]
    } else {
    // else selected stocks become filtered by type
      selectedStocks = selectedStocks.filter(s => s.type === this.state.selectSort)
    }
    if (this.state.sortBy === "Alphabetically") {
      return selectedStocks.sort((firstStock, secondStock) => {if (firstStock.name < secondStock.name) {return -1}
                                                              if (firstStock.name > secondStock.name) {return 1}
                                                              return 0})
    } else if (this.state.sortBy === "Price"){
      return selectedStocks.sort((firstStock, secondStock) => firstStock.price - secondStock.price)
    } else {
      return selectedStocks
    }
  }

  render() {
    // console.log(this.state.myPortofolio)
    return (
      <div>
        <SearchBar
          handleRadio={this.handleRadio}
          sortBy={this.state.sortBy}
          handleSelect={this.handleSelect}
          selectSort={this.selectSort}/>

          <div className="row">
            <div className="col-8">

              <StockContainer
              //stocks={this.state.stocks}
                stocks={this.selectStock()}
                addToPortofolio={this.addToPortofolio}
              />

            </div>
            <div className="col-4">

              <PortfolioContainer
                myPortofolio={this.state.myPortofolio}
                removeFromPortofolio={this.removeFromPortofolio}
             />
            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
