pragma solidity ^0.8.18;

import "./waterSource.sol";
// import "./profile.sol";


contract lake is waterSource{

    constructor(address _profileContractAddress) waterSource(_profileContractAddress) {}

    function bidReqs(uint16 _postId,uint _bidAmount) internal view override returns(bool){
        return (_bidAmount < collection[_postId].price);
    }
        
    function payout(uint16 _postId) internal override {
        collection[_postId].EOA.call{value:bids[_postId][collection[_postId].winningBidId].bidAmount}("");
        bids[_postId][collection[_postId].winningBidId].bidderEOA.call{value:collection[_postId].price}("");
    }

}