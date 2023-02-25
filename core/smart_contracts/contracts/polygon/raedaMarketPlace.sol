// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract raedaMarketPlace {
  uint private logReqIdCount = 0;
  uint private supReqIdCount = 0;

  struct logReq {
    uint id;
    uint providerID;
    string providerName;
    address providerAddress;
    string initialGeohash;
    string finalGeohash;
    uint storageSpace;
    bool live;
    uint askingPrice;
  }
  
  struct supReq {
    uint id;
    uint supplierID;
    string supplierName;
    address supplierAddress;
    string initialGeohash;
    string finalGeohash;
    uint storageQuantity;
    bool live;
    uint offerPrice;
  }

  mapping(uint => logReq) public logCollection;
  mapping(uint => supReq) public supCollection;

  event logEntry(uint indexed _id, uint indexed _providerID, string _providerName, address _providerAddress, string _initialGeohash, string _finalGeohash, uint _storageSpace, bool indexed _live, uint _askingPrice);
  event supEntry(uint indexed _id, uint indexed _supplierID, string _supplierName, address _supplierAddress, string _initialGeohash, string _finalGeohash, uint _storageQuantity, bool indexed _live, uint _offerPrice);


  function uploadLogisticsRequest(uint _providerID, string calldata _providerName, string calldata _initialGeohash, string calldata _finalGeohash,uint _storageSpace,uint _askingPrice) external returns(uint){
    logReqIdCount+=1;
    logReq memory logisticsRequest;
    logisticsRequest = logReq(logReqIdCount,_providerID,_providerName,msg.sender,_initialGeohash,_finalGeohash,_storageSpace,true,_askingPrice);
    logCollection[logReqIdCount] = logisticsRequest;
    emit logEntry(logReqIdCount,_providerID,_providerName,msg.sender,_initialGeohash,_finalGeohash,_storageSpace,true,_askingPrice);
  }

  function uploadSupplyRequest(uint _supplierID, string calldata _supplierName, string calldata _initialGeohash, string calldata _finalGeohash, uint _storageQuantity,uint _offerPrice) external returns(uint){
    supReqIdCount+=1;
    supReq memory supplierRequest;
    supplierRequest = supReq(supReqIdCount,_supplierID,_supplierName,msg.sender,_initialGeohash,_finalGeohash,_storageQuantity,true,_offerPrice);
    supCollection[supReqIdCount] = supplierRequest;
    emit supEntry(supReqIdCount,_supplierID,_supplierName,msg.sender,_initialGeohash,_finalGeohash,_storageQuantity,true,_offerPrice);
  }

// nb solidity does not support optional parameters
  function editLogisticsRequest(uint _id,string calldata _initialGeohash, string calldata _finalGeohash,uint _storageSpace,bool _live,uint _askingPrice) external{
    logReq memory prevLogReq;
    prevLogReq = logCollection[_id];
    require(msg.sender == prevLogReq.providerAddress,"1: Not the address associated with this request");
    logCollection[_id] = logReq(_id,prevLogReq.providerID,prevLogReq.providerName,msg.sender,_initialGeohash,_finalGeohash,_storageSpace,_live,_askingPrice);
    emit logEntry(_id,prevLogReq.providerID,prevLogReq.providerName,msg.sender,_initialGeohash,_finalGeohash,_storageSpace,_live,_askingPrice);
  }

  function editSupplyRequest(uint _id,string calldata _initialGeohash, string calldata _finalGeohash,uint _storageQuantity,bool _live,uint _offerPrice) external{
    supReq memory prevSupReq;
    prevSupReq = supCollection[_id];
    require(msg.sender == prevSupReq.supplierAddress,"2: Not the address associated with this request");
    supCollection[_id] = supReq(_id,prevSupReq.supplierID,prevSupReq.supplierName,msg.sender,_initialGeohash,_finalGeohash,_storageQuantity,_live,_offerPrice);
    emit supEntry(_id,prevSupReq.supplierID,prevSupReq.supplierName,msg.sender,_initialGeohash,_finalGeohash,_storageQuantity,_live,_offerPrice);
  }

//   function readAvailSupplyReqs(uint x) external view{

//   }

//   function readAvailLogReqs(uint x) external view{

//   }

//   function bidLogRequest(uint x) external {

//   }

//   function bidSupplyRequest(uint x) external{

//   }
  
}
