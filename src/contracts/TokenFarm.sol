// pragma solidity ^0.5.0;
pragma solidity >=0.5.0 <0.9.0;

import "./DaiToken.sol";
import "./DappToken.sol";

    contract TokenFarm {
                                            // state variable that will be be stored in the blockchaun network
        string public name = "Yield Token Farm";
           
                                            //assign token as state vars
        address public owner;
        DappToken public  dappToken;
        DaiToken public  daiToken;
    
         address[] public stakers;    // the address array that will keep track of all the addresses that have ever staked
         mapping(address => uint) public stakingBalance; //this will help to map thru and return the available from the given address
         mapping(address => bool) public  hasStaked;   // checking if the user has staked
         mapping(address => bool) public  isStaking;   


        constructor(DappToken _dappToken, DaiToken _daiToken ) public{
              dappToken = _dappToken;
              daiToken = _daiToken;
              owner = msg.sender;
        }


        // 1. deposite tokens {}
        function stakeTokens(uint _amount) public {

                                            //daiToken.transferFrom(_from,  _to,   _value);
                                            //so here the token is transfered from the invested wallet(DAI) to the smart contract(TokenFarm)
                                            //msg is a global var and the sender is the person who innitiated the transfer
                                            // this keyword is the TokenFarm object its self to corespond with its address and the amount

              // require an amount greater than zero
              require(_amount > 0, "amount to stake must be grater than zero");

            //transfer mock dai to his contractor for staking
            daiToken.transferFrom(msg.sender,  address(this),   _amount);  

            // update staking balance  
            stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

              if(!hasStaked[msg.sender]){  // add users to the array if they have staked
                        stakers.push(msg.sender);             
              }
              //update staking status
              isStaking[msg.sender] = true;
              hasStaked[msg.sender] = true;
           }


            //2. withdraw tokens
             function unstakeTokens( ) public {

                     
                     // fetch the staking balance
                     uint balance = stakingBalance[msg.sender];

                  //ensure balance is grater than zero
                   require(balance > 0, "stating balance can not be 0" );

                   // transfer tokens Dai from the app to the user
                   daiToken.transfer(msg.sender,  balance);

                   //reset there staking balance
                   stakingBalance[msg.sender] = 0;
                   //update staking balance so that they can not stake anymore
                   isStaking[msg.sender] = false;

                }

     
        //.3 issuing of tokens zei 1:25
        function issueTokens() public{
 
             //make sure that only the token issuer can call this function 
             require(msg.sender == owner, "only the  call then func");

             for(uint i= 0; i < stakers.length; i++){
                   
               address recipient = stakers[i];
               uint balance  = stakingBalance[recipient];
               if(balance > 0){
                        dappToken.transfer(recipient, balance);

               }
             }
        }

}
