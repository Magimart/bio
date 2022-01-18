pragma solidity ^0.5.0;
 import "./DaiToken.sol";
 import "./DappToken.sol";


    contract TokenFarm {
                                            // state variable that will be be stored in the blockchaun network
    string public name = "Yield Token Farm";

                                            //assign token as state vars
        DappToken public  dappToken;
        DaiToken public  daiToken;
    
        constructor( DappToken _dappToken, DaiToken _daiToken ) public {
        dappToken = _dappToken;
        daiToken = _daiToken;
    }

}
