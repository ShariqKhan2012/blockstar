const ContestCloneFactory = artifacts.require("ContestCloneFactory");
//require ('dotenv').config({path: '../.env'});
module.exports = function (deployer) {
  deployer.deploy(ContestCloneFactory);
};
