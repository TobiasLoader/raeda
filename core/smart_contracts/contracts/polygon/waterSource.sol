pragma solidity >=0.4.21 <0.7.0;

contract waterSource {

    uint private postIdCount = -1;
    uint private bidIdCount = -1;

    enum whichBucketValue {INT,BOOL,STRING}

    struct bucketValues {
        whichBucketValue valType;
        uint intVal;
        bool boolVal;
        string strVal;
    }

    struct Post {
        // uint postId;
        uint userId;
        address EOA;
        uint price;
        string iX;
        string fX;
        uint iT;
        uint fT;
        uint exp;
        bool live;
        mapping(string => bucketValues) bucket;
    }

    struct Bid {
        uint bidId;
        uint bidderId;
        address bidderEOA;
        uint bidAmount;
    }

    event postEvent(uint indexed _postId,Post _post);
    event bidEvent(uint indexed _postId, Bid _bid);

    event bucketEvent(uint indexed _postId, string indexed _category, whichBucketValue indexed _bucketValType);

    mapping(uint => Post) public collection;
    mapping(uint => Bid) public bids;

    function authorise(uint _userId,address _EOA) internal {
        return true;
    }


    //add profile check to ensure EOA in profile
    function initPost(uint _userId,uint _price,string calldata _iX,string calldata _fX) payable external {
        require(waterSource.authorise(_userId, msg.sender));
        postIdCount +=1;        
        collection[postIdCount].userId = _userId; 
        collection[postIdCount].EOA = msg.sender; 
        collection[postIdCount].price = _price; 
        collection[postIdCount].iX = _iX;
        collection[postIdCount].fX = _fX;
        collection[postIdCount].live = true;
        emit postEvent(postIdCount, collection[postIdCount]);
        
    }
    
    //nb default values
    function addToBucket(uint _postId,string calldata _category,whichBucketValue calldata _valType, uint _intVal, bool _boolVal, string calldata _strVal) external {
        require(waterSource.authorise(collection[_postId].userId, msg.sender));
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

    function takeDownBid(uint _postId, ) public {
        require(waterSource.authorise(collection[_postId].userId, msg.sender));
    }

    function bid(uint _postId, uint _bidderId, uint _bidAmount) payable external {
        bidIdCount += 1;
        bids[_postId].bidId = bidIdCount;
        bids[_postId].bidderId = _bidderId;
        bids[_postId].bidderEOA = msg.sender;
        bids[_postId].bidAmount = _bidAmount;
        //add funds to contract EOA
        emit bidEvent(_postId, bids[_postId]);       
    }

    // function receiveBid() payable external {

    // }
    function acceptBid(uint _postId, uint _bidId) external{
        waterSource.takeDownBid();
    }

    function closeDeal() external {

    }


}