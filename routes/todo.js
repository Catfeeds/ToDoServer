const express = require('express');
const router = express.Router();
const todoModel = require('../model/todoModel');

router.use('/addtask  ', function (req, res, next) {
    todoModel.addModel(req, res);
});

router.use('/querydaytask', function (req, res) {
  todoModel.queryDayTask(req, res);
})

module.exports = router;
