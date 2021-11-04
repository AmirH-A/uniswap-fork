const BonusToken = artifacts.require("BonusToken.sol");
const LiquidityMigrator = artifacts.require("LiquidityMigrator.sol");

module.exports = async function (deployer) {
  await deployer.deploy(BonusToken);
  const bonusToken = await BonusToken.deployed();

  const routerAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
  const pairAddress = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
  const routerForkAddress = '0x24382F0d1BB76666Ef1310D52Adb3fE6FCD5618e';
  const pairForkAddress = '0x0f118DC523622eF8605bb895041730CC7aF8a5c6';

  await deployer.deploy(
    LiquidityMigrator,
    routerAddress,
    pairAddress,
    routerForkAddress,
    pairForkAddress,
    bonusToken.address
  );

  const liquidityMigrator = await LiquidityMigrator.deployed();

  await bonusToken.setLiquidator(liquidityMigrator.address);
};