import React, { Component } from 'react';
import CryptoCard from './components/crypto-card'
class App extends Component {
  render() {
    return (
      <div className="App">
        <CryptoCard name="Bitcoin" symbol="BTC"/>
      </div>
    );
  }
}

export default App;
