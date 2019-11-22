const request = require("request");
const bitCore = require("bitcore-lib");

const brainWallet = (userInput, callback) => {
  const input = new Buffer(userInput);
  const hash = bitCore.crypto.Hash.sha256(input);
  const bn = bitCore.crypto.BN.fromBuffer(hash);
  const privateKey = new bitCore.PrivateKey(bn).toWIF();
  const addy = new bitCore.PrivateKey(bn).toAddress();
  request(
    {
      url: `https://blockchain.info/address/${addy}?format=json`,
      json: true
    },
    (err, response) => {
      if (err) {
        return console.log(err);
      }
      callback(privateKey, addy);
    }
  );
};

const getPrice = () => {
  const options = {
    url: `https://blockchain.info/ticker`,
    json: true
  };
  return new Promise((resolve, reject) => {
    request(options, (err, response) => {
      if (err) {
        return reject(err);
      }
      return resolve(response);
    });
  });
};

const getBlocks = async () => {
  const options = {
    url: "https://blockchain.info/stats?format=json",
    json: true
  };
  return new Promise((resolve, reject) => {
    request(options, (err, response) => {
      if (err) {
        return reject(err);
      }
      const btcBlock = response.body.n_blocks_total;
      return resolve(btcBlock);
    });
  });
};

module.exports = {
  brainWallet,
  getPrice,
  getBlocks
};
