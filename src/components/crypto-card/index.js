import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
import './styles.css'

class CryptoCard extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: props.name,
            symbol: props.symbol,
            price:null,
            lastPrice:null
        }

        this.pollPrice = this.pollPrice.bind(this)
    }

    componentDidMount() {
        this.pollPrice()
        setInterval(this.pollPrice, 10000)
    }

    pollPrice(){
        console.log("polling for new price")
        const { symbol } = this.state
        fetch(`https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=${symbol},USD`)
            .then(res => res.json())
            .then(json => {
                this.setState((prevState) => ({
                    price: json.USD,
                    lastPrice:prevState.price !== json.USD ? prevState.price : prevState.lastPrice
                }))
            })
    }

    priceChange(lastPrice, price) {
        const diff = lastPrice - price
        const change = diff / lastPrice

        return ( change * 100 ).toFixed(3)
    }
    render() {
        const { name, symbol, price, lastPrice } = this.state;

        const gainloss = lastPrice > price ? 'loss' : 'gain';
        return (
            <div className={`card ${gainloss}`}>
                <div className="name">
                    <div>
                        {name} <span>({symbol})</span>
                    </div>
                </div>

                <div className={`percent ${gainloss}`}>
                    {this.priceChange(lastPrice,price)}%
                </div>
                
                <div className="symbol">
                
                </div>

                <div className={`price ${gainloss}`}>
                    {price}
                </div>
            </div>
        )
    }
}

export default CryptoCard
