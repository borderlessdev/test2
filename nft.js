const { BeaconWallet } = require('@taquito/beacon-wallet');
const { TempleWallet } = require('@temple-wallet/dapp');
const { TezosToolkit } = require('@taquito/taquito');

const wallet = new BeaconWallet({ name: 'My DApp' });
const Tezos = new TezosToolkit('https://YOUR-RPC-URL.com');

async function createNFT(nftName, nftDescription, nftImage) {
  // Connect to wallet
  const availableWallets = await TempleWallet.isAvailable();
  if (!availableWallets || availableWallets.length === 0) {
    throw new Error('No Temple wallet is available');
  }
  const templeWallet = new TempleWallet('My DApp');
  await templeWallet.connect('carthagenet');

  // Get contract instance
  const contract = await Tezos.wallet.at('KT1FVfi5SFiWay5eqSX7Pr37ztP23oTnRuHi');

  // Create NFT
  const operation = await contract.methods.createNFT(nftName, nftDescription, nftImage).send({ wallet: templeWallet });

  return operation.hash;
}

module.exports = { createNFT };
