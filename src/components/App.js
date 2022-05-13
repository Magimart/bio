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
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>

                   <h1>Dai App</h1>

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
