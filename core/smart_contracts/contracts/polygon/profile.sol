pragma solidity ^0.8.18;

enum waterTypes {LAKE,RIVER}


contract profile {

    uint16 private userIdCount = 0;


    //Profile contains: id,name,EOAs,brief description, lake/river
    struct Profile {
        // uint16 _userId;
        waterTypes waterType;
        string profileName;
        mapping(address => bool) EOAs;
        string description;         
    }

    mapping(uint16 => Profile) public profiles;
    event profileEvent(uint16 indexed _userId);
    event addressEvent(uint16 indexed _userId, address indexed );
    mapping(string=>bool) public profileNames;

//check parameter of function with enum
    function createProfile(waterTypes _waterType,string calldata _profileName, string calldata _description) external{
        require(!profileNames[_profileName],"This profile name has been taken");
        userIdCount +=1;
        profiles[userIdCount].waterType = _waterType;
        profiles[userIdCount].profileName = _profileName;
        profiles[userIdCount].EOAs[msg.sender]=true;
        profiles[userIdCount].description = _description;
        profileNames[_profileName]=true;
        emit profileEvent(userIdCount);
        emit addressEvent(userIdCount, msg.sender);
    }

    function addEOA(uint16 _userId, address _newEOA) external {
        require(profiles[_userId].EOAs[msg.sender]);
        profiles[_userId].EOAs[_newEOA]=true;
        emit addressEvent(_userId, _newEOA);
    }

    function checkEOA(uint16 _userId, address _EOA) public view returns(bool){
        return profiles[_userId].EOAs[_EOA];
    }


}