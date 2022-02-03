
const { assert } = require('chai');

const DappToken = artifacts.require('DappToken');
const DaiToken = artifacts.require('DaiToken');
const TokenFarm = artifacts.require('TokenFarm');

require('chai')
      .use(require('chai-as-promised'))
      .should()


       // helper hook to help get token
      function getTokes(num) {
         return web3.utils.toWei(num, 'ether')
      }

      
//    tests here  zei 50:00
//     contract('TokenFarm', (accounts) => { -----refactored

     contract('TokenFarm', ([owner, investor]) => {

         let daiToken, dappToken, tokenFarm


          before(async()=> {

               //__loading smart contracts
               daiToken = await DaiToken.new()
               dappToken = await DappToken.new()
               tokenFarm = await TokenFarm.new(
                    dappToken.address, daiToken.address
               )

               //to transfering all dapp tokens to farm
               await dappToken.transfer(tokenFarm.address, getTokes('1000000'))

               //send he transfered  tokens to investor
               // await daiToken.transfer(accounts[1], tokens('100'), {from: accounts[0]}) --refactored
               await daiToken.transfer(investor, getTokes('100'), {from: owner})

          })
          
                 // test des for dai mock token
           describe('Mock DAI deployment', async() => {
               it( 'has a name', async() => {
                    const name = await daiToken.name()
                    assert.equal(name, 'Mock DAI Token') 
               })
             
          })
        
                // tests for dapp token
          describe('Dapp Token deployment', async() => {
               it( 'has a name', async() => {
                    const name = await dappToken.name()
                    assert.equal(name, 'DApp Token') 
               })
             
          })

                //_________test for yield tokenfarm
          describe('TokenFarm Token deployment', async() => {
               it( 'has a name', async() => {
                    const name = await tokenFarm.name()
                    assert.equal(name, 'Yield Token Farm') 
               })

               // this test is to make sure that all the the tokens have been transfred to the tokenfarm
               it('contracts has tokens', async()=> {
                   let balance = await dappToken.balanceOf(tokenFarm.address)
                   assert.equal(balance.toString(), getTokes('1000000'))
                  }
               )
             
          })
    }
)

