const profile = artifacts.require("profile");
const waterSource = artifacts.require("waterSource");
const lake = artifacts.require("lake");
const river = artifacts.require("river");
const verifyTributary = artifacts.require("verifyTributary")

module.exports = async function (deployer) {
  await deployer.deploy(profile).then(function(){
    // console.log(profile.address);
    return deployer.deploy(lake,profile.address);
    
  }).then(function (){
    return deployer.deploy(river,profile.address)
  }).then(function() {
    return deployer.deploy(verifyTributary,lake.address,river.address)
  }).then(function() {
    lake.setVerifyTributaryAddress(verifyTributary.address)
    river.setVerifyTributaryAddress(verifyTributary.address)
  })



  // const profileInstance = await profile.deployed();
  // console.log(profileInstance)

};
