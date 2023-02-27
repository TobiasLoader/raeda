pragma solidity >=0.4.21 <0.7.0;

import "./waterSource.sol";

contract lake is waterSource{

    function bidReqs(uint32 _postId,uint _bidAmount) internal view returns(bool){
        return (_bidAmount < collection[_postId].price);
    }
        
    function payout(uint32 _postId) internal {
        (bool sentRiver,bytes memory dataRiver) = collection[_postId].EOA.call{value:bids[_postId][collection[_postId].winningBidId].bidAmount}("");
        (bool sentLake, bytes memory dataLake) = bids[_postId][collection[_postId].winningBidId].bidderEOA.call{value:collection[_postId].price}("");
    }

}