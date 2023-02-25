const raedaMarketPlace = artifacts.require("raedaMarketPlace");

module.exports = function (deployer) {
  deployer.deploy(raedaMarketPlace);
};
