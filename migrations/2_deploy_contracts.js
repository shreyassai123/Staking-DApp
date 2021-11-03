var MplRewards = artifacts.require("MplRewards");
var StakingToken = artifacts.require("StakingToken")
var RewardToken = artifacts.require("RewardToken")
module.exports = function(deployer) {
    deployer.deploy(MplRewards, "" /*Reward Token Address*/, "" /*StakingTokenAddress*/, "" /*Your Address*/);
    deployer.deploy(StakingToken)
    deployer.deploy(RewardToken)

};