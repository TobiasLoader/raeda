pragma solidity ^0.8.18;

import "./waterSource.sol";
// import "./profile.sol";


contract river is waterSource{

    uint16 private postIdCount = 1;


    constructor(address _profileContractAddress) waterSource(_profileContractAddress) {}

    function verifyOnRiverPost(uint16 _postId) external {
        require(msg.sender == verifyTributaryAddress,"Error: this function can only be triggered by the verifying contract");
        pendingDeals[_postId] = dealStates.VERIFIED;
    }

    function bidReqs(uint16 _postId,uint _bidAmount) internal view override returns(bool){
        return (_bidAmount > collection[_postId].price);
    }

    function payout(uint16 _postId) internal override {
        collection[_postId].EOA.call{value:collection[_postId].price}("");
        bids[_postId][collection[_postId].winningBidId].bidderEOA.call{value:bids[_postId][collection[_postId].winningBidId].bidAmount}("");

    }

    // function addESGData(uint16 _postI)

}