import React, { Component } from 'react'
import Navbar from './Navbar'
import './App.css'
import Web3 from 'web3'
import DaiToken from '../abis/DaiToken.json'
import DappToken from '../abis/DappToken.json'
import YieldFarm from '../abis/TokenFarm.json'



class App extends Component {

  constructor(props) {
    super(props)
        this.state = {
          accounts: 0*0,
          dappToken:{},
          daiToken: {},
          tokenFarm: {} ,
          dappTokenBalance: "0",
          daiTokenBalannce: "0" ,
          stakingBalance: "0",
          loading: true  
        } 
  }


// swap with usestate,useEffect
  async componentWillMount() {

    console.log(this.state)

    await this.loadWeb3()
    await this.loadBlockchainData()
  }


//_________loading blockchain data
async loadBlockchainData() {
  const web3 = window.web3

  const accounts = await web3.eth.getAccounts()

  this.setState({ account: accounts[0] })
   console.log(accounts)

  //___________detect network that are available on etherum
    const networkId = await web3.eth.net.getId()
    console.log(networkId)

    //load deployed networks
        const daiTokenNetwork = DaiToken.networks[networkId]
        console.log(daiTokenNetwork)

        if(daiTokenNetwork) {
          try {
                const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenNetwork.address)

                console.log(daiToken)

                this.setState({ daiToken })

                // let daiTokenBalance = await daiToken.methods.balanceOf(this.state.accounts).call()
                let daiTokenBalance = await daiToken.methods.balanceOf(this.state.accounts)
                this.setState({ daiTokenBalance: daiTokenBalance.toString() })

                     return true;
                
              } catch (error) {
                console.log(error)
              }

        } else {
             return false;
        }

        const dappTokenNetwork = DappToken.networks[networkId]
        if(dappTokenNetwork) {
           try {
                  const dappToken = new web3.eth.Contract(DappToken.abi, dappTokenNetwork.address)
                  this.setState({ dappToken })
                  let dappTokenBalance = await dappToken.methods.balanceOf(this.state.accounts).call()
                  this.setState({ dappTokenBalance: dappTokenBalance.toString() })
                return true;
             
           } catch (error) {
             console.log(error)
           }

        } else {
          return false
 
         }

         const YieldFarmNetwork = YieldFarm.networks[networkId]
         if(YieldFarmNetwork) {
             try {
              const yieldFarm = new web3.eth.Contract(YieldFarm.abi, YieldFarmNetwork.address)
              this.setState({ yieldFarm })
              let stakingBalance = await yieldFarm.methods.stakingBalance(this.state.accounts).call()
              this.setState({ stakingBalance: stakingBalance.toString() })
              return true;
             } catch (error) {
               console.log(error)
             }
         } else {
                 return false
        }

}


//________________load web3 into the app
  async loadWeb3() {
    try {
                if (typeof window.ethereum !== 'undefined') {
                      window.web3 = new Web3(window.ethereum)
                    //   window.web3 = new Web3(window.web3.currentProvider)

                      await window.ethereum.enable()
                      return true;
                  }  
                
                  else {
                      return false
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
                   <h1>Yield Farm App </h1>
                   <h5>Note: migrating this app to a new host</h5>
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
