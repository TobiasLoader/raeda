pragma solidity ^0.8.18;

import "./waterSource.sol";
// import "./profile.sol";


contract lake is waterSource{

    constructor(address _profileContractAddress) waterSource(_profileContractAddress) public {}

    function bidReqs(uint32 _postId,uint _bidAmount) internal view override returns(bool){
        return (_bidAmount < collection[_postId].price);
    }
        
    function payout(uint32 _postId) internal override {
        (bool sentRiver,bytes memory dataRiver) = collection[_postId].EOA.call{value:bids[_postId][collection[_postId].winningBidId].bidAmount}("");
        (bool sentLake, bytes memory dataLake) = bids[_postId][collection[_postId].winningBidId].bidderEOA.call{value:collection[_postId].price}("");
    }

}