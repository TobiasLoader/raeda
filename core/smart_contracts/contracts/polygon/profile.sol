pragma solidity >=0.4.21 <0.7.0;

contract profile {

    uint32 private userIdCount = 0;

    enum waterTypes {LAKE,RIVER}

    //Profile contains: id,name,EOAs,brief summary, lake/river
    struct Profile {
        // uint32 _userId;
        waterTypes waterType;
        string userName;
        mapping(address => bool) EOAs;
        string summary;         
    }

    mapping(uint32 => Profile) public profiles;
    event profileEvent(uint32 indexed _userId, waterTypes indexed _waterType, string _userName, string _summary);

//check parameter of function with enum
    function addProfile(waterTypes _waterType,string calldata _userName, string calldata _summary) external{
        userIdCount +=1;
        profiles[userIdCount].waterType = _waterType;
        profiles[userIdCount].userName = _userName;
        profiles[userIdCount].EOAs[msg.sender]=true;
        profiles[userIdCount].summary = _summary;
        emit profileEvent(userIdCount,_waterType,_userName,_summary);
    }

    function addEOA(uint32 _userId, address _newEOA) external {
        require(profiles[_userId].EOAs[msg.sender]);
        profiles[_userId].EOAs[_newEOA]=true;
    }

    function checkEOA(uint32 _userId, address _EOA) public view returns(bool){
        return profiles[_userId].EOAs[_EOA];
    }


}