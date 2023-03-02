pragma solidity ^0.8.18;

import "./profile.sol";

abstract contract waterSource {

    profile profileContract;

    uint16 private postIdCount = 0;
    uint16 private bidIdCount = 0;

    // enum whichBucketValue {INT,BOOL,STRING}
    enum dealStates {NOTCLOSED,LAKECLOSED,RIVERCLOSED,BOTHCLOSED}
    // enum waterTypes {LAKE,RIVER}


    // struct BucketValues {
    //     whichBucketValue valType;
    //     uint16 intVal;
    //     bool boolVal;
    //     string strVal;
    // }

    struct Location {
        uint64 x;
        uint64 y;
    }

    struct Post {
        // uint16 postId;
        string postName;
        string description;
        uint16 profileId;
        address EOA;
        uint256 price;
        Location iX;
        Location fX;
        uint16 iT;
        uint16 fT;
        uint64 exp;
        bool live;
        mapping(string => string) bucket;
        uint16 winningBidId;
    }

    struct Bid {
        // uint16 bidId;
        uint16 bidderId;
        address bidderEOA;
        uint256 bidAmount;
        bool accepted;
    }

    event postEvent(uint16 indexed _postId, bool indexed _live);
    event bidEvent(uint16 indexed _postId, uint16 indexed _bidId, bool indexed _accepted);
    event resetEvent(uint16 indexed _postId);
    event bucketEvent(uint16 indexed _postId, string indexed _category);
    event pendingEvent(uint16 indexed _postId, dealStates indexed _dealState);

    mapping(uint16 => Post) public collection;
    mapping(uint16 => mapping(uint16=>Bid)) public bids;
    mapping(uint16 => uint16[]) public bidsArray;
    mapping(uint16 => dealStates) public pendingDeals;
    address owner;

    constructor(address _profileContractAddress) {
        profileContract = profile(_profileContractAddress);
        owner = msg.sender;
    }

    // fallback() external payable {

    // }

    function authorise(uint16 _profileId,address _EOA) internal view returns(bool){
        return profileContract.checkEOA(_profileId,_EOA);
    }

    function expiryCheck(uint16 _postId) internal view returns (bool){
        return block.timestamp < collection[_postId].exp;
    }

    //instead of price as parameter, have it just be the amount sent to the contract
    function initPost(string calldata _postName, uint16 _profileId,uint64 _iXx,uint64 _iXy,uint64 _fXx,uint64 _fXy,uint64 _exp) payable external {
        require(waterSource.authorise(_profileId, msg.sender),"Error: EOA is not associated with this user");
        require(_exp>block.timestamp,"Error: expiry time is in the past");
        postIdCount +=1;
        collection[postIdCount].EOA = msg.sender; 
        collection[postIdCount].price = msg.value; 
        collection[postIdCount].postName = _postName;        
        collection[postIdCount].profileId = _profileId; 
        collection[postIdCount].iX = Location(_iXx,_iXy);
        collection[postIdCount].fX = Location(_fXx,_fXy);
        collection[postIdCount].exp = _exp;
        collection[postIdCount].live = true;
        emit postEvent(postIdCount,true);        
    }

    function resetBids(uint16 _postId) internal {

        for (uint i=0; i<bidsArray[_postId].length;i++){
            bids[_postId][bidsArray[_postId][i]].bidderEOA.call{value:bids[_postId][bidsArray[_postId][i]].bidAmount};
            delete bids[_postId][bidsArray[_postId][i]];      
        }
        delete bidsArray[_postId];
        emit resetEvent(_postId);
        //might have to include a thing that clears the bids mapping, but for gas efficiency, will not
    }

    function addInitialTime(uint16 _postId,uint16 _iT) external {
        require(waterSource.authorise(collection[_postId].profileId, msg.sender),"Error: EOA is not associated with this user");
        collection[_postId].iT=_iT;
        waterSource.resetBids(_postId);
        emit postEvent(_postId, collection[postIdCount].live);
    }

    function editDescription(uint16 _postId, string calldata _description) external {
        require(waterSource.authorise(collection[_postId].profileId, msg.sender),"Error: EOA is not associated with this user");
        collection[_postId].description = _description;
        waterSource.resetBids(_postId);
        emit postEvent(_postId, collection[postIdCount].live);
    }

    function addFinalTime(uint16 _postId,uint16 _fT) external {
        require(waterSource.authorise(collection[_postId].profileId, msg.sender),"Error: EOA is not associated with this user");
        collection[_postId].fT=_fT;
        waterSource.resetBids(_postId);
        emit postEvent(_postId, collection[postIdCount].live);
    }

    function getInitialLocation(uint16 _postId) external view returns (uint64,uint64){
        Location memory location;
        location = collection[_postId].iX;
        return (location.x,location.y);
    }

    function getFinalLocation(uint16 _postId) external view returns  (uint64,uint64){
        Location memory location;
        location = collection[_postId].fX;
        return (location.x,location.y);
    }

    function editInitialLocation(uint16 _postId,uint64 _x, uint64 _y) external {
        require(waterSource.authorise(collection[_postId].profileId, msg.sender),"Error: EOA is not associated with this user");
        collection[_postId].iX.x = _x;
        collection[_postId].iX.y = _y;
        emit postEvent(_postId, collection[postIdCount].live);
    }

    function editFinalLocation(uint16 _postId,uint64 _x, uint64 _y) external {
        require(waterSource.authorise(collection[_postId].profileId, msg.sender),"Error: EOA is not associated with this user");
        collection[_postId].fX.x = _x;
        collection[_postId].fX.y = _y;
        emit postEvent(_postId, collection[postIdCount].live);
    }

    function editInitialTime(uint16 _postId, uint16 _iT) external {
        require(waterSource.authorise(collection[_postId].profileId, msg.sender),"Error: EOA is not associated with this user");
        collection[_postId].iT = _iT;
        emit postEvent(_postId, collection[postIdCount].live);
    }

    function editFinalTime(uint16 _postId, uint16 _fT) external {
        require(waterSource.authorise(collection[_postId].profileId, msg.sender),"Error: EOA is not associated with this user");
        collection[_postId].fT = _fT;
        emit postEvent(_postId, collection[postIdCount].live);
    }

    function editExpiryTime(uint16 _postId, uint64 _exp) external {
        require(waterSource.authorise(collection[_postId].profileId, msg.sender),"Error: EOA is not associated with this user");
        require(_exp>block.timestamp,"Error: expiry time is in the past");
        collection[_postId].exp = _exp;
        emit postEvent(_postId, collection[postIdCount].live);
    }
        
    
    //nb default values
    function addToBucket(uint16 _postId,string calldata _category,string calldata _value) external {
        require(waterSource.authorise(collection[_postId].profileId, msg.sender),"Error: EOA is not associated with this user");
        collection[_postId].bucket[_category] = _value;
        // if (_valType==whichBucketValue.INT){
        //     collection[_postId].bucket[_category].valType = whichBucketValue.INT;
        //     collection[_postId].bucket[_category].intVal = _intVal;
        // }
        // else if (_valType == whichBucketValue.BOOL) {
        //     collection[_postId].bucket[_category].valType = whichBucketValue.BOOL;
        //     collection[_postId].bucket[_category].boolVal = _boolVal;
        // }
        // else if (_valType == whichBucketValue.STRING){
        //     collection[_postId].bucket[_category].valType = whichBucketValue.STRING;
        //     collection[_postId].bucket[_category].strVal = _strVal;
        // }
        waterSource.resetBids(_postId);
        // emit postEvent(_postId, collection[postIdCount].live);
        emit bucketEvent(_postId, _category);

    }

    function checkBucket(uint16 _postId, string memory _category) public view returns(string memory){
        return collection[_postId].bucket[_category];
    }

    function takeDownPost(uint16 _postId) public {
        require(waterSource.authorise(collection[_postId].profileId, msg.sender),"Error: EOA is not associated with this user");
        collection[_postId].live = false;
        waterSource.resetBids(_postId);
        collection[_postId].EOA.call{value:collection[_postId].price};
        emit postEvent(_postId,false);        
    }

    function bidReqs(uint16,uint) internal view virtual returns(bool){return true;}

    function bid(uint16 _postId, uint16 _bidderId) payable external {
        require(waterSource.bidReqs(_postId,msg.value),"Does not meet criteria for dutch/english bid");
        waterTypes bidderWaterType;
        waterTypes posterWaterType;
        (bidderWaterType,,) = profileContract.profiles(_bidderId);
        (posterWaterType,,) = profileContract.profiles(collection[_postId].profileId);
        require(!(bidderWaterType==posterWaterType),"Error: not allowed to bid on post of same water type");
        bidIdCount += 1;
        bids[_postId][bidIdCount].bidderId = _bidderId;
        bids[_postId][bidIdCount].bidderEOA = msg.sender;
        bids[_postId][bidIdCount].bidAmount = msg.value;
        bids[_postId][bidIdCount].accepted = false;
        bidsArray[_postId].push(bidIdCount);
        emit bidEvent(_postId, bidIdCount,false);
    }

    function returnFailedBids(uint16 _postId, uint16 _successfulBidId) internal view {
        for(uint i=0;i < bidsArray[_postId].length - 1; i++) {
            if (bidsArray[_postId][i]!=_successfulBidId){
                bids[_postId][bidsArray[_postId][i]].bidderEOA.call{value:bids[_postId][bidsArray[_postId][i]].bidAmount};
            }
        }
    }

    function acceptBid(uint16 _postId, uint16 _bidId) external{
        require(waterSource.authorise(collection[_postId].profileId,msg.sender),"Error: EOA is not associated with this user");
        require(waterSource.expiryCheck(_postId),"Error: post has expired");
        waterSource.takeDownPost(_postId);
        bids[_postId][_bidId].accepted=true;
        pendingDeals[_postId]=dealStates.NOTCLOSED;
        collection[_postId].winningBidId = _bidId;
        waterSource.returnFailedBids(_postId,_bidId);
        emit bidEvent(_postId,_bidId,true);
    }

    function involvedInDeal(uint16 _postId, uint16 _profileId) internal view returns (bool){
        if (collection[_postId].profileId==_profileId){
            return true;
        }
        else if (bids[_postId][collection[_postId].winningBidId].bidderId==_profileId){
            return true;
        }
        return false;
    }

    function payout(uint16 _postId) internal virtual {}

    function closeDeal(uint16 _postId,uint16 _profileId) external {
        require(waterSource.involvedInDeal(_postId,_profileId),"Error: profileId not associated with this deal");
        waterTypes userWaterType;
        (userWaterType, , ) = profileContract.profiles(_profileId);
        if (pendingDeals[_postId] == dealStates.NOTCLOSED){
            if (userWaterType == waterTypes.LAKE){
                pendingDeals[_postId] = dealStates.LAKECLOSED;
            }
            else if (userWaterType == waterTypes.RIVER){
                pendingDeals[_postId] = dealStates.RIVERCLOSED;
            }
        }
        else if (pendingDeals[_postId] == dealStates.LAKECLOSED){
            if (userWaterType == waterTypes.RIVER){
                pendingDeals[_postId] = dealStates.BOTHCLOSED;
                waterSource.payout(_postId);
            }
            else if (userWaterType == waterTypes.LAKE){
                assert(false);
            }
        }
        else if (pendingDeals[_postId] == dealStates.RIVERCLOSED){
            if (userWaterType == waterTypes.LAKE){
                pendingDeals[_postId] = dealStates.BOTHCLOSED;
                waterSource.payout(_postId);
            }
            else if (userWaterType == waterTypes.RIVER){
                assert(false);
            }
        }
        else if (pendingDeals[_postId] == dealStates.RIVERCLOSED){
            assert(false);
        }

        emit pendingEvent(_postId, pendingDeals[_postId]);

        //add emit
    }

    function refundExpiredPost(uint16 _postId) public view {
        require(msg.sender == owner || msg.sender == collection[_postId].EOA || msg.sender == address(this),"Smart Contract Error: not authorised to refund from this post");
        require(collection[_postId].exp>block.timestamp,"The post has not expired");
    
        collection[_postId].EOA.call{value:collection[_postId].price};
        for (uint i=0; i<bidsArray[_postId].length;i++){
            bids[_postId][bidsArray[_postId][i]].bidderEOA.call{value:bids[_postId][bidsArray[_postId][i]].bidAmount};
        }
    }
}