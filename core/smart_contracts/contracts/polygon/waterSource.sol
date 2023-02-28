pragma solidity ^0.8.18;

import "./profile.sol";

abstract contract waterSource {

    profile profileContract;

    uint32 private postIdCount = 0;
    uint32 private bidIdCount = 0;

    enum whichBucketValue {INT,BOOL,STRING}
    enum dealStates {NOTCLOSED,LAKECLOSED,RIVERCLOSED,BOTHCLOSED}
    // enum waterTypes {LAKE,RIVER}


//change id type to bytes..
    struct BucketValues {
        whichBucketValue valType;
        uint32 intVal;
        bool boolVal;
        string strVal;
    }

    struct Location {
        uint32 x;
        uint32 y;
    }

    struct Post {
        // uint32 postId;
        string postName;
        uint32 userId;
        address EOA;
        uint256 price;
        Location iX;
        Location fX;
        uint32 iT;
        uint32 fT;
        uint32 exp;
        bool live;
        mapping(string => BucketValues) bucket;
        uint32 winningBidId;
    }

    struct Bid {
        // uint32 bidId;
        uint32 bidderId;
        address bidderEOA;
        uint256 bidAmount;
        bool accepted;
    }

    event postEvent(uint32 indexed _postId, bool indexed _live);
    event bidEvent(uint32 indexed _postId, uint32 indexed _bidId, bool indexed _accepted);

    event bucketEvent(uint32 indexed _postId, string indexed _category, whichBucketValue indexed _bucketValType);

    mapping(uint32 => Post) public collection;
    mapping(uint32 => mapping(uint32=>Bid)) public bids;
    mapping(uint32 => dealStates) public pendingDeals;

    constructor(address _profileContractAddress) {
        profileContract = profile(_profileContractAddress);
    }

    // fallback() external payable {

    // }

    function authorise(uint32 _userId,address _EOA) internal view returns(bool){
        return profileContract.checkEOA(_userId,_EOA);
    }

    function expiryCheck(uint32 _postId) internal view returns (bool){
        return block.timestamp < collection[_postId].exp;
    }

    //instead of price as parameter, have it just be the amount sent to the contract
    function initPost(string calldata _postName, uint32 _userId,uint32 _iXx,uint32 _iXy,uint32 _fXx,uint32 _fXy,uint32 _exp) payable external {
        require(waterSource.authorise(_userId, msg.sender),"Error: EOA is not associated with this user");
        postIdCount +=1;
        collection[postIdCount].EOA = msg.sender; 
        collection[postIdCount].price = msg.value; 
        collection[postIdCount].postName = _postName;        
        collection[postIdCount].userId = _userId; 
        collection[postIdCount].iX = Location(_iXx,_iXy);
        collection[postIdCount].fX = Location(_fXx,_fXy);
        collection[postIdCount].exp = _exp;
        collection[postIdCount].live = true;
        emit postEvent(postIdCount,true);        
    }

    function addInitialTime(uint32 _postId,uint32 _iT) external {
        require(waterSource.authorise(collection[_postId].userId, msg.sender),"Error: EOA is not associated with this user");
        collection[_postId].iT=_iT;
    }

    function addFinalTime(uint32 _postId,uint32 _fT) external {
        require(waterSource.authorise(collection[_postId].userId, msg.sender),"Error: EOA is not associated with this user");
        collection[_postId].fT=_fT;
    }
    
    //nb default values
    function addToBucket(uint32 _postId,string calldata _category,whichBucketValue _valType, uint32 _intVal, bool _boolVal, string calldata _strVal) external {
        require(waterSource.authorise(collection[_postId].userId, msg.sender),"Error: EOA is not associated with this user");
        if (_valType==whichBucketValue.INT){
            collection[_postId].bucket[_category].valType = whichBucketValue.INT;
            collection[_postId].bucket[_category].intVal = _intVal;
        }
        else if (_valType == whichBucketValue.BOOL) {
            collection[_postId].bucket[_category].valType = whichBucketValue.BOOL;
            collection[_postId].bucket[_category].boolVal = _boolVal;
        }
        else if (_valType == whichBucketValue.STRING){
            collection[_postId].bucket[_category].valType = whichBucketValue.STRING;
            collection[_postId].bucket[_category].strVal = _strVal;
        }
        emit bucketEvent(_postId, _category, _valType);

    }

    function checkBucket(uint32 _postId, string memory _category) public view returns(uint32,bool,string memory){
        return (collection[_postId].bucket[_category].intVal,collection[_postId].bucket[_category].boolVal,collection[_postId].bucket[_category].strVal);
    }

    function takeDownPost(uint32 _postId) public {
        require(waterSource.authorise(collection[_postId].userId, msg.sender),"Error: EOA is not associated with this user");
        collection[_postId].live = false;
        emit postEvent(_postId,false);
    }

    function bidReqs(uint32,uint) internal view virtual returns(bool){return true;}

    function bid(uint32 _postId, uint32 _bidderId) payable external {
        require(waterSource.bidReqs(_postId,msg.value),"Does not meet criteria for dutch/english bid");
        bidIdCount += 1;
        bids[_postId][bidIdCount].bidderId = _bidderId;
        bids[_postId][bidIdCount].bidderEOA = msg.sender;
        bids[_postId][bidIdCount].bidAmount = msg.value;
        bids[_postId][bidIdCount].accepted = false;
        emit bidEvent(_postId, bidIdCount,false);       
    }
    
//add requirements for expiry time
    function acceptBid(uint32 _postId, uint32 _bidId) external{
        require(waterSource.authorise(collection[_postId].userId,msg.sender),"Error: EOA is not associated with this user");
        require(waterSource.expiryCheck(_postId),"Error: post has expired");
        waterSource.takeDownPost(_postId);
        bids[_postId][_bidId].accepted=true;
        pendingDeals[_postId]=dealStates.NOTCLOSED;
        collection[_postId].winningBidId = _bidId;
        emit bidEvent(_postId,_bidId,true);
    }

    function involvedInDeal(uint32 _postId, uint32 _userId) internal view returns (bool){
        if (collection[_postId].userId==_userId){
            return true;
        }
        else if (bids[_postId][collection[_postId].winningBidId].bidderId==_userId){
            return true;
        }
        return false;
    }

    function payout(uint32 _postId) internal virtual {}

    function closeDeal(uint32 _postId,uint32 _userId) external {
        require(waterSource.involvedInDeal(_postId,_userId),"Error: userId not associated with this deal");
        waterTypes userWaterType;
        (userWaterType, , ) = profileContract.profiles(_userId);
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

        //add emit
    }


}