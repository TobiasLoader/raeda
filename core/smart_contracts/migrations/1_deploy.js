const profile = artifacts.require("profile");
const waterSource = artifacts.require("waterSource");

module.exports = function (deployer) {
  deployer.deploy(profile).then(function(){
    // console.log(profile.address);
    return deployer.deploy(waterSource,profile.address);
  })



  // const profileInstance = await profile.deployed();
  // console.log(profileInstance)

};
