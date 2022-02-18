pragma solidity ^0.5.0;
import "./DaiToken.sol";
import "./DappToken.sol";

    contract TokenFarm {
                                            // state variable that will be be stored in the blockchaun network
        string public name = "Yield Token Farm";
                                            //assign token as state vars
        DappToken public  dappToken;
        DaiToken public  daiToken;
    
         address[] public stakers;    // the address array that will keep track of all the addresses that have ever staked
         mapping(address => uint) public stakingBalance; //this will help to map thru and return the available from the given address
         mapping(address => bool) public  hasStaked;   // checking if the user has staked
         mapping(address => bool) public  isStaking;   


        constructor( DappToken _dappToken, DaiToken _daiToken ) public {
              dappToken = _dappToken;
              daiToken = _daiToken;
        }


        // 1. deposite tokens {}
        function stakeTokens(uint _amount) public {

                                            //daiToken.transferFrom(_from,  _to,   _value);
                                            //so here the token is transfered from the invested wallet(DAI) to the smart contract(TokenFarm)
                                            //msg is a global var and the sender is the person who innitiated the transfer
                                            // this keyword is the TokenFarm object its self to corespond with its address and the amount

            daiToken.transferFrom(msg.sender,  address(this),   _amount);  

                                            // update sating balance  
                     stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

              if(!hasStaked[msg.sender]){  // add users to the array if they have staked
                        stakers.push(msg.sender);             
              }
              //update staking status
              isStaking[msg.sender] = true;
              hasStaked[msg.sender] = true;
           }


        //2. withdraw tokens
     
        //.3 issuing of tokens

}
