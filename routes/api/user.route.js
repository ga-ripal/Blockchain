const express = require("express");
const router = express.Router();
const path = require("path");
const {
  brainWallet,
  getBlocks,
  getPrice
} = require("../../utills/common.functions");
const apiHelper = require("../../helpers/api.helper");
const ERROR_LITERALS = require("../../constants/error-literals.constant");
const { ROUTES } = require("../../constants/routes.constant");

router.get(`${ROUTES.BLOCKCHAIN.TEST.URL}`, async (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "..", "..", "public", "wallet.html"));
  } catch (err) {
    return apiHelper.failure(
      res,
      [err],
      ERROR_LITERALS.BLOCKCHAIN.TEST.FAILURE
    );
  }
});

router.get(`${ROUTES.BLOCKCHAIN.BLOCK.URL}`, async (req, res, next) => {
  try {
    let btcBlocks = await getBlocks();
    return apiHelper.success(
      res,
      { btcBlocks },
      ERROR_LITERALS.BLOCKCHAIN.TEST.SUCCESS
    );
  } catch (err) {
    return apiHelper.failure(
      res,
      [err],
      ERROR_LITERALS.BLOCKCHAIN.TEST.FAILURE
    );
  }
});

router.post(`${ROUTES.BLOCKCHAIN.WALLET.URL}`, async (req, res, next) => {
  try {
    const brainsrc = req.body.brainsrc;
    if (brainsrc) {
      brainWallet(brainsrc, (privateKey, address) => {
        return apiHelper.success(
          res,
          { address, privateKey },
          ERROR_LITERALS.BLOCKCHAIN.TEST.SUCCESS
        );
      });
    }
  } catch (err) {
    return apiHelper.failure(
      res,
      [err],
      ERROR_LITERALS.BLOCKCHAIN.TEST.FAILURE
    );
  }
});

router.get(`${ROUTES.BLOCKCHAIN.PRICE.URL}`, async (req, res, next) => {
  try {
    let getPriceData = await getPrice();
    if (getPriceData) {
      return apiHelper.success(
        res,
        { getPriceData },
        ERROR_LITERALS.BLOCKCHAIN.TEST.SUCCESS
      );
    }
  } catch (err) {
    return apiHelper.failure(
      res,
      [err],
      ERROR_LITERALS.BLOCKCHAIN.TEST.FAILURE
    );
  }
});

module.exports = router;
