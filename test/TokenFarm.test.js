const { assert } = require('chai');

// const { assert } = require('chai');
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

          before(async() => {
               //__loading smart contracts
               daiToken = await DaiToken.new()
               //  await daiToken.name().then(el=>console.log(el)) 
               dappToken = await DappToken.new()
               tokenFarm = await TokenFarm.new(dappToken.address, daiToken.address ) // pass address of all stakers in the pool
               await dappToken.transfer(tokenFarm.address, getTokes('1000000'))  //to transfering all dapp tokens to farm

               //send the transfered  tokens to investor
               // await daiToken.transfer(accounts[1], tokens('100'), {from: accounts[0]}) --refactored
               await daiToken.transfer(investor, getTokes('100'), {from: owner})
          })
          
                 // test des for dai mock token
         describe('Mock DAI deployment', async() => {
               it( 'has a name', async() => {
                    const name = await daiToken.name()
                                          // checks if the name === "'Mock DAI Token"
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
               it( 'has a name ', async() => {
                    const name = await tokenFarm.name()
                    assert.equal(name, 'Yield Token Farm') 
               })

               // this test is to make sure that all the the tokens have been transfred to the tokenfarm
               it('contracts has tokens', async()=> {
                   let balance = await dappToken.balanceOf(tokenFarm.address)
                                                  //checks for balance in dapp toeken
                   assert.equal(balance.toString(), getTokes('1000000'))
                  }
               )
             
          })
          //______test to check investors balance b4 t´staking
          describe('Farming tokens',async() => {
            it('rewards investors for staking mDai zeit 1:18',  async () => {
               let result;

                    result = await daiToken.balanceOf(investor);
                    assert.equal(result.toString(), getTokes('100'), 'checks if investors wallet balance is correct before staking')
              
                 //  dai toke holder approves the token, hence giving dapp token permission to to stake the dai tokens
                   await daiToken.approve(tokenFarm.address, getTokes('100'), {from: investor});
                   await tokenFarm.stakeTokens(getTokes('100'), {from: investor});

                  //d check for the investors wallet if the transfering amount exists inthe investors wallet
                  result = await daiToken.balanceOf(investor);
               //    assert.equal(result.toString(), getTokes('100'), 'investor Dai wallet is 0 after staking')
               assert.equal(result.toString(), getTokes('0'), 'investor Dai wallet is 0 after staking')


                  // check that TokenFarm has recieved 100 tokens
                  result = await daiToken.balanceOf(tokenFarm.address)
                  assert.equal(result.toString(), getTokes('100'), 'the Token Farm(YieldFarm) is correct after staking')
                  //check if staking balcnace is correct
                  result = await tokenFarm.stakingBalance(investor)
                  assert.equal(result.toString(), getTokes('100'), 'the investor is staking balance')

                    // check that the inveator status is staking
                    result = await tokenFarm.isStaking(investor)
                    console.log("testing results")
                    console.log(result)
                    assert.equal(result.toString(), 'true', 'the investor is staking')
                 
                    //test for the issuing of thee tokens from the owner
                    await tokenFarm.issueTokens({from: owner});
               
                
                  // check balance after token issuing and make sure its 100 tokens
                  result = await dappToken.balanceOf(investor);
                  assert.equal(result.toString(), getTokes('100'), 'the investor dappApp balance is correct after issuing the token' )
          

                   // make sure that the owner is the only p erson to call this function 
                   await tokenFarm.issueTokens({from: investor}).should.be.rejected;

      // Unstake tokens
      await tokenFarm.unstakeTokens({ from: investor })

      // Check corectresults afrter  unstaking
      result = await tokenFarm.stakingBalance(investor)
      assert.equal(result.toString(), getTokes('0'), 'investor staking balance correct after staking')

      result = await tokenFarm.isStaking(investor)
      assert.equal(result.toString(), 'false', 'investor staking status correct after staking')
   
      result = await daiToken.balanceOf(investor)
      assert.equal(result.toString(), getTokes('100'), 'investor Mock DAI wallet balance correct after staking')

      result = await daiToken.balanceOf(tokenFarm.address)
      assert.equal(result.toString(), getTokes('0'), 'Token Farm Mock DAI balance correct after staking')


          })
     })
})


