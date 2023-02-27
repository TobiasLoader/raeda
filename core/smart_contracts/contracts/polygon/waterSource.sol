pragma solidity >=0.4.21 <0.7.0;

import "./profile.sol";

abstract contract waterSource {

    profile profileContract;

    uint32 private postIdCount = 0;
    uint32 private bidIdCount = 0;

    enum whichBucketValue {INT,BOOL,STRING}
    enum dealStates {notClosed,lakeClosed,riverClosed,bothClosed}
    enum waterTypes {LAKE,RIVER}


    struct bucketValues {
        whichBucketValue valType;
        uint32 intVal;
        bool boolVal;
        string strVal;
    }

    struct Post {
        // uint32 postId;
        uint32 userId;
        address EOA;
        uint32 price;
        string iX;
        string fX;
        uint32 iT;
        uint32 fT;
        uint32 exp;
        bool live;
        mapping(string => bucketValues) bucket;
        uint32 winningBidId;
    }

    struct Bid {
        // uint32 bidId;
        uint32 bidderId;
        address bidderEOA;
        uint32 bidAmount;
        bool accepted;
    }

    event postEvent(uint32 indexed _postId, bool indexed _live);
    event bidEvent(uint32 indexed _postId, uint32 indexed _bidId, bool indexed _accepted);

    event bucketEvent(uint32 indexed _postId, string indexed _category, whichBucketValue indexed _bucketValType);

    mapping(uint32 => Post) public collection;
    mapping(uint32 => mapping(uint32=>Bid)) public bids;
    mapping(uint32 => dealStates) public pendingDeals;

    constructor(address profileContractAddress) public{
        profileContract = profile(profileContractAddress);
    }

    function authorise(uint32 _userId,address _EOA) internal view returns(bool){
        return profileContract.checkEOA(_userId,_EOA);
    }

    function expiryCheck(uint32 _postId) internal view returns (bool){
        return now < collection[_postId].exp;
    }

    //instead of price as parameter, have it just be the amount sent to the contract
    function initPost(uint32 _userId,string calldata _iX,string calldata _fX,uint32 _exp) payable external {
        require(waterSource.authorise(_userId, msg.sender),"Error: EOA is not associated with this user");
        postIdCount +=1;        
        collection[postIdCount].userId = _userId; 
        collection[postIdCount].EOA = msg.sender; 
        collection[postIdCount].price = msg.value; 
        collection[postIdCount].iX = _iX;
        collection[postIdCount].fX = _fX;
        collection[postIdCount].live = true;
        collection[postIdCount].exp = _exp;
        emit postEvent(postIdCount,true);
        
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

    function bidReqs(uint32 _postId,uint _bidAmount) internal view returns(bool);

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
        require(water.Source.expiryCheck(_postId),"Error: post has expired");
        waterSource.takeDownPost();
        bids[_postId][_bidId].accepted=true;
        pendingDeals[_postId]=dealStates.notClosed;
        collection[_postId].winningBidId = _bidId;
        emit bidEvent(_postId,_bidId,true);
    }

    function involvedInDeal(uint32 _postId, uint32 _userId) returns (bool){
        if (collection[_postId].userId==_userId){
            return true;
        }
        else if (bids[_postId][collection[_postId].winningBidId].bidderId==_userId){
            return true;
        }
        return false;
    }

    function payout(uint32 _postId) internal;

    function closeDeal(uint32 _postId,uint32 _userId) external {
        require(waterSource.involvedInDeal(_postId,_userId),"Error: userId not associated with this deal");
        if (pendingDeals[_postId] == dealStates.notClosed){
            if (profileContract.profiles(_userId).waterType == waterTypes.LAKE){
                pendingDeals[_postId] = dealStates.lakeClosed;
            }
            else if (profileContract.profiles(_userId).waterType == waterTypes.RIVER){
                pendingDeals[_postId] = dealStates.riverClosed;
            }
        }
        else if (pendingDeals[_postId] == dealStates.lakeClosed){
            if (profileContract.profiles(_userId).waterType == waterTypes.RIVER){
                pendingDeals[_postId] = dealStates.bothClosed;
                waterSource.payout(_postId);
            }
            else if (profileContract.profiles(_userId).waterType == waterTypes.LAKE){
                assert("Already closed deal on your side");
            }
        }
        else if (pendingDeals[_postId] == dealStates.riverClosed){
            if (profileContract.profiles(_userId).waterType == waterTypes.LAKE){
                pendingDeals[_postId] = dealStates.bothClosed;
                waterSource.payout(_postId);
            }
            else if (profileContract.profiles(_userId).waterType == waterTypes.RIVER){
                assert("Already closed deal on your side");
            }
        }
        else if (pendingDeals[_postId] == dealStates.riverClosed){
            assert("Already closed");
        }

        //add payments!!

    }


}