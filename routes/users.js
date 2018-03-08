const express = require('express');
const router = express.Router();
const userModel = require('../model/userModel');

router.use('/login', function (req, res, next) {
  userModel.loginModel(req, res);
});

router.use('/reg_code', function (req, res, next) {
  userModel.regist_validateModel(req, res);
})

router.use('/regist', function (req, res, next) {
  userModel.registModel(req, res);
});

router.use('/forget_code', function (req, res, next) {
  userModel.forgetModel(req, res);
});

router.use('/reset', function (req, res, next) {
  userModel.resetModel(req, res);
});
module.exports = router;
