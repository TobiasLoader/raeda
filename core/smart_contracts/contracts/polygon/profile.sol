pragma solidity >=0.4.21 <0.7.0;

contract profile {

    uint private userIdCount = -1;

    enum waterTypes {LAKE,RIVER}

    //Profile contains: id,name,EOAs,brief summary, lake/river
    struct Profile {
        // uint _userId;
        waterTypes waterType;
        string userName;
        mapping(address => bool) EOAs;
        string summary;         
    }

    mapping(uint => Profile) public profiles;
    event profileEvent(uint indexed _userId, waterTypes indexed _waterType, string _userName, string _summary);

    function addProfile(waterTypes _waterType,string calldata _userName, string calldata _summary) external {
        userIdCount +=1;
        profiles[userIdCount].waterType = _waterType;
        profiles[userIdCount].EOAs[msg.sender]=true;
        profiles[userIdCount].summary = _summary;
        emit profileEvent(userIdCount,_waterType,_userName,_summary)
    }

    function addEOA(uint _userId, address newEOA) external {
        require(profiles[_userId].EOAs[msg.sender]);
        profiles[_userId].EOAs[msg.sender]=true;

    }


}