import React, { Component } from 'react'
import Navbar from './Navbar'
import './App.css'
import Web3 from 'web3'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0'
    }
  }



// swap with usestate,useEffect
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }


//_________loading blockchain data
async loadBlockchainData() {
  const web3 = window.web3

  const accounts = await web3.eth.getAccounts()
  //const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

  this.setState({ account: accounts[0] })

  //___________logs account 1
    console.log(accounts)
    const networkId = await web3.eth.net.getId()
    console.log(networkId)
}


//________________load web3 into the app
async loadWeb3() {
   try {

        if (typeof window.ethereum !== 'undefined') {
         window.web3 = new Web3(window.ethereum)
         await window.ethereum.enable()
    }
    // if (window.ethereum) {
    //   try {
    //     const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    //     console.log(accounts)
    //     // setAccounts(accounts);
    //   } catch (error) {
    //     if (error.code === 4001) {
    //       // User rejected request
    //     }
    
    //     // setError(error);
    //     console.log(error)
    //   }
     //}
  
  
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('You have not yet installed Metamask on your browser, Please install to use this App')
    }
   } catch (error) {
     console.log(error)
     
   }
}


  render() {
    return (
      <div className='appWrapper'>
        <Navbar account={this.state.account} />
        <div className="container-fluid">
          <div className="row">
            <main className="mainWrapper col-lg-12 ml-auto mr-auto">
              <div className="contentWrapper">
                   <h1>Yield Farm App</h1>
              </div>
              <div className="contentWrapper">
                  <a href="https://art3-studio.vercel.app/magima/">
                   <h2 className='followAppLink'>Follow this app development proccess on my Page</h2>
                  </a>    
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
