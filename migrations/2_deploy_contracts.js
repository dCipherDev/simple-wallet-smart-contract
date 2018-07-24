var myWallet = artifacts.require("./myWallet.sol");

module.exports = function(deployer) {
	deployer.deploy(myWallet);
};