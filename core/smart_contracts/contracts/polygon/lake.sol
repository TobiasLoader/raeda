pragma solidity ^0.8.18;

import "./waterSource.sol";
// import "./profile.sol";


contract lake is waterSource{

    uint16 private postIdCount;
    uint16 private bidIdCount;

    constructor(address _profileContractAddress, uint16 _initialPostId,uint16 _initialBidId) waterSource(_profileContractAddress,_initialPostId,_initialBidId) {}

    // function verifyOnOwnPost() external {

    // }

    // function verify

    function bidReqs(uint16 _postId,uint _bidAmount) internal view override returns(bool){
        return (_bidAmount < collection[_postId].price);
    }
        
    function payout(uint16 _postId) internal override {
        collection[_postId].EOA.call{value:bids[_postId][collection[_postId].winningBidId].bidAmount}("");
        bids[_postId][collection[_postId].winningBidId].bidderEOA.call{value:collection[_postId].price}("");
    }

    // function verifyOnOwnPost(uint16 _postId) external {
    //     require(msg.sender==verifyTributaryAddress,"Error: this function can only be triggered by the verifying contract");
    //     pendingDeals[_postId] = dealStates.VERIFIED;
    // }

}