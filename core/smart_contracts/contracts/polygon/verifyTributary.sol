pragma solidity ^0.8.18;

import "./verifiers/ZKPVerifier.sol";
import "./lake.sol";
import "./river.sol";

contract verifyTributary is ZKPVerifier{

    // uint64 public constant LAKE_ON_RIVER_REQUEST_ID = 1;
    // uint64 public constant RIVER_ON_LAKE_REQUEST_ID = 2;

    lake lakeContract;
    river riverContract;

    constructor(address _lakeAddress,address _riverAddress){
        lakeContract = lake(_lakeAddress);
        riverContract = river(_riverAddress);
    }

    function _beforeProofSubmit(
        uint64, /* requestId */
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal view override {
        // check that the challenge input of the proof is equal to the msg.sender 
        address addr = GenesisUtils.int256ToAddress(
            inputs[validator.getChallengeInputIndex()]
        );
        require(
            _msgSender() == addr,
            "address in the proof is not a sender address"
        );
    }

    function _afterProofSubmit(
        uint64 requestId,
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal override {
        // require(requestId == LAKE_ON_RIVER_REQUEST_ID || requestId == RIVER_ON_LAKE_REQUEST_ID,"Error: invalid request id");

        if (requestId % 2 == 0){
            lake.verifyOnOwnPost(requestId);
        }
        else {
            river.verifyOnRiverPost(requestId);
        }

    }






}