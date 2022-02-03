// const TokenFarm = artifacts.require('TokenFarm');
// module.exports = function(deployer) {
//   deployer.deploy(TokenFarm);
// };

// --NOTE
// this file is the put new contracts to the blockchain

//lve2  ________ zeit37:37
// smart contracts in the network
// to do that we make some modification to the above
  const DappToken = artifacts.require('DappToken');
  const DaiToken = artifacts.require('DaiToken');
  const TokenFarm = artifacts.require('TokenFarm');


module.exports =async function(deployer, network, accounts) {

  // deploy daitoken  
  await deployer.deploy(DaiToken)
  const daiToken = await DaiToken.deployed()

  // ddeploy the dapptoken 
  await deployer.deploy(DappToken)
  const dappToken = await DappToken.deployed()

  // deploy yield farm contracts
    await deployer.deploy(TokenFarm, dappToken.address, daiToken.address);
    const tokenForm  = await TokenFarm.deployed()

    // transfer all dapp token to the TokenFarm 
    await dappToken.transfer(tokenForm.address, '1000000000000000000000000')


    // transfer 100 dai token to the investor
   await daiToken.transfer(accounts[1], '1000000000000000000000000') 
};
