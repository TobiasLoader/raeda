const profile = artifacts.require("profile");
const waterSource = artifacts.require("waterSource");
const lake = artifacts.require("lake");
const river = artifacts.require("river");

module.exports = function (deployer) {
  deployer.deploy(profile).then(function(){
    // console.log(profile.address);
    return deployer.deploy(lake,profile.address);
    
  }).then(function (){
    deployer.deploy(river,profile.address)
  })



  // const profileInstance = await profile.deployed();
  // console.log(profileInstance)

};
