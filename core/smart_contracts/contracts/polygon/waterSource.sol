pragma solidity ^0.8.18;

import "./profile.sol";
// import "./verifyTributary.sol";

abstract contract waterSource {

    profile profileContract;
    // address verifyTributaryAddress;

    uint16 private postIdCount;
    uint16 private bidIdCount;

    enum post_states {LIVE,PENDING,VERIFIED,LAKECLOSED,RIVERCLOSED,CLOSED}

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
        uint64 iT;
        uint64 fT;
        uint64 exp;
        // bool live;
        mapping(string => string) bucket;
        uint16 winningBidId;
        post_states postState;
    }

    struct Bid {
        // uint16 bidId;
        uint16 bidderId;
        address bidderEOA;
        uint256 bidAmount;
        // bool accepted;
    }

    event postEvent(uint16 indexed _postId, post_states indexed _postState);
    event bidEvent(uint16 indexed _postId, uint16 indexed _bidId);
    event resetEvent(uint16 indexed _postId);
    event bucketEvent(uint16 indexed _postId, string indexed _category);
    // event pendingEvent(uint16 indexed _postId, dealStates indexed _dealState);

    mapping(uint16 => Post) public collection;
    mapping(uint16 => mapping(uint16=>Bid)) public bids;
    mapping(uint16 => uint16[]) public bidsArray;
    // mapping(uint16 => dealStates) public pendingDeals;
    address owner;

    constructor(address _profileContractAddress, uint16 _initialPostId,uint16 _initialBidId) {
        profileContract = profile(_profileContractAddress);
        owner = msg.sender;
        postIdCount = _initialPostId;
        bidIdCount = _initialBidId;
    }

    // function setVerifyTributaryAddress(address _verifyTributaryAddress) external {
    //     require(msg.sender == owner);
    //     verifyTributaryAddress = _verifyTributaryAddress;
    // }
    // fallback() external payable {

    // }

    function authorise(uint16 _profileId,address _EOA) internal view returns(bool){
        return profileContract.checkEOA(_profileId,_EOA);
    }

    function expiryCheck(uint16 _postId) internal returns (bool){
        if(block.timestamp < collection[_postId].exp){
            return true;
        }
        else{
            refundExpiredPost(_postId);
            return false;
        }
    }

    //instead of price as parameter, have it just be the amount sent to the contract
    function initPost(string calldata _postName, uint16 _profileId,uint64 _iXx,uint64 _iXy,uint64 _fXx,uint64 _fXy,uint64 _exp) payable external {
        require(authorise(_profileId, msg.sender),"Error: EOA is not associated with this user");
        require(_exp>block.timestamp,"Error: expiry time is in the past");
        postIdCount +=2;
        collection[postIdCount].EOA = msg.sender; 
        collection[postIdCount].price = msg.value; 
        collection[postIdCount].postName = _postName;        
        collection[postIdCount].profileId = _profileId; 
        collection[postIdCount].iX = Location(_iXx,_iXy);
        collection[postIdCount].fX = Location(_fXx,_fXy);
        collection[postIdCount].exp = _exp;
        collection[postIdCount].postState = post_states.LIVE;
        // collection[postIdCount].live = true;
        emit postEvent(postIdCount,post_states.LIVE);        
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

    function editInitialTime(uint16 _postId,uint64 _iT) external {
        require(authorise(collection[_postId].profileId, msg.sender),"Error: EOA is not associated with this user");
        collection[_postId].iT=_iT;
        resetBids(_postId);
        emit postEvent(_postId, collection[_postId].postState);
    }

    function editDescription(uint16 _postId, string calldata _description) external {
        require(authorise(collection[_postId].profileId, msg.sender),"Error: EOA is not associated with this user");
        collection[_postId].description = _description;
        resetBids(_postId);
        emit postEvent(_postId, collection[_postId].postState);
    }

    function editFinalTime(uint16 _postId,uint64 _fT) external {
        require(authorise(collection[_postId].profileId, msg.sender),"Error: EOA is not associated with this user");
        collection[_postId].fT=_fT;
        resetBids(_postId);
        emit postEvent(_postId, collection[_postId].postState);
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
        require(authorise(collection[_postId].profileId, msg.sender),"Error: EOA is not associated with this user");
        collection[_postId].iX.x = _x;
        collection[_postId].iX.y = _y;
        resetBids(_postId);
        emit postEvent(_postId, collection[_postId].postState);
    }

    function editFinalLocation(uint16 _postId,uint64 _x, uint64 _y) external {
        require(authorise(collection[_postId].profileId, msg.sender),"Error: EOA is not associated with this user");
        collection[_postId].fX.x = _x;
        collection[_postId].fX.y = _y;
        resetBids(_postId);
        emit postEvent(_postId, collection[_postId].postState);
    }

    // function editInitialTime(uint16 _postId, uint16 _iT) external {
    //     require(authorise(collection[_postId].profileId, msg.sender),"Error: EOA is not associated with this user");
    //     collection[_postId].iT = _iT;
    //     emit postEvent(_postId, collection[postIdCount].live);
    // }

    // function editFinalTime(uint16 _postId, uint16 _fT) external {
    //     require(authorise(collection[_postId].profileId, msg.sender),"Error: EOA is not associated with this user");
    //     collection[_postId].fT = _fT;
    //     emit postEvent(_postId, collection[postIdCount].live);
    // }

    function editExpiryTime(uint16 _postId, uint64 _exp) external {
        require(authorise(collection[_postId].profileId, msg.sender),"Error: EOA is not associated with this user");
        require(_exp>block.timestamp,"Error: expiry time is in the past");
        collection[_postId].exp = _exp;
        resetBids(_postId);
        emit postEvent(_postId, collection[_postId].postState);
    }
        
    
    //nb default values
    function addToBucket(uint16 _postId,string calldata _category,string calldata _value) external {
        require(authorise(collection[_postId].profileId, msg.sender),"Error: EOA is not associated with this user");
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
        resetBids(_postId);
        // emit postEvent(_postId, collection[postIdCount].live);
        emit bucketEvent(_postId, _category);

    }

    function checkBucket(uint16 _postId, string memory _category) public view returns(string memory){
        return collection[_postId].bucket[_category];
    }

    function takeDownPost(uint16 _postId) public {
        require(authorise(collection[_postId].profileId, msg.sender) || (msg.sender == address(this)),"Error: EOA is not associated with this user");
        require(collection[_postId].postState==post_states.LIVE,"Error: cannot take down post");
        collection[_postId].postState = post_states.CLOSED;
        resetBids(_postId);
        collection[_postId].EOA.call{value:collection[_postId].price};
        emit postEvent(_postId,collection[_postId].postState);        
    }



    function bidReqs(uint16,uint) internal view virtual returns(bool){return true;}

    function bid(uint16 _postId, uint16 _bidderId) payable external virtual {
        require(bidReqs(_postId,msg.value),"Does not meet criteria for dutch/english bid");
        require(collection[_postId].postState == post_states.LIVE,"Error: post is not live");
        waterTypes bidderWaterType;
        waterTypes posterWaterType;
        (bidderWaterType,,) = profileContract.profiles(_bidderId);
        (posterWaterType,,) = profileContract.profiles(collection[_postId].profileId);
        require(!(bidderWaterType==posterWaterType),"Error: not allowed to bid on post of same water type");
        bool expCheck = expiryCheck(_postId);

        if (expCheck){
            bidIdCount += 2;
            bids[_postId][bidIdCount].bidderId = _bidderId;
            bids[_postId][bidIdCount].bidderEOA = msg.sender;
            bids[_postId][bidIdCount].bidAmount = msg.value;
            bidsArray[_postId].push(bidIdCount);
            emit bidEvent(_postId, bidIdCount);
        }
    }

    function returnFailedBids(uint16 _postId, uint16 _successfulBidId) internal view {
        for(uint i=0;i < bidsArray[_postId].length; i++) {
            if (bidsArray[_postId][i]!=_successfulBidId){
                bids[_postId][bidsArray[_postId][i]].bidderEOA.call{value:bids[_postId][bidsArray[_postId][i]].bidAmount};
            }
        }
    }

    function acceptBid(uint16 _postId, uint16 _bidId) external{
        require(collection[_postId].postState==post_states.LIVE,"Error: post is no longer live");
        require(authorise(collection[_postId].profileId,msg.sender),"Error: EOA is not associated with this user");

        bool expCheck = expiryCheck(_postId);

        if (expCheck){
            collection[_postId].winningBidId = _bidId;
            collection[_postId].postState = post_states.PENDING;
            returnFailedBids(_postId,_bidId);
        }
        emit postEvent(_postId,post_states.PENDING);
        
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

    function closeDeal(uint16 _postId,uint16 _profileId) external payable {
        require(involvedInDeal(_postId,_profileId),"Error: profileId not associated with this deal");
        // require(pendingDeals[_postId]!=dealStates.NOTCLOSED,"Error: deal needs to be verified before it can be closed");
        waterTypes userWaterType;
        (userWaterType, , ) = profileContract.profiles(_profileId);
        if (collection[_postId].postState == post_states.PENDING){
            if (userWaterType == waterTypes.LAKE){
                collection[_postId].postState = post_states.LAKECLOSED;
            }
            else if (userWaterType == waterTypes.RIVER){
                collection[_postId].postState = post_states.RIVERCLOSED;
            }
        }
        else if (collection[_postId].postState == post_states.LAKECLOSED){
            if (userWaterType == waterTypes.RIVER){
                collection[_postId].postState = post_states.CLOSED;
                payout(_postId);
            }

        }
        else if (collection[_postId].postState == post_states.RIVERCLOSED){
            if (userWaterType == waterTypes.LAKE){
                collection[_postId].postState = post_states.CLOSED;
                payout(_postId);
            }

        }
        emit postEvent(_postId, collection[_postId].postState);

        //add emit
    }

    function refundExpiredPost(uint16 _postId) public {
        require(msg.sender == owner || msg.sender == collection[_postId].EOA || msg.sender == address(this),"Smart Contract Error: not authorised to refund from this post");
        require(collection[_postId].exp>block.timestamp,"The post has not expired");
        require(collection[_postId].postState == post_states.LIVE, "This post is no longer live");
        // takeDownPost(_postId);
    
        collection[_postId].EOA.call{value:collection[_postId].price};
        for (uint i=0; i<bidsArray[_postId].length;i++){
            bids[_postId][bidsArray[_postId][i]].bidderEOA.call{value:bids[_postId][bidsArray[_postId][i]].bidAmount};
        }
        collection[_postId].postState = post_states.CLOSED;
        emit postEvent(_postId,post_states.CLOSED);
    }
}