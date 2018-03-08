var db = require('../mysqlDB/DBServise');

/*
    查询用户ID是否存在
 */
function selectUID(sql, param, callback) {
  db.queryArgs(sql, param.uid, function (err, result) {
    callback(err, result);
  });
}

function addDayTask(sql, param, callback) {
  db.queryArgs(sql, [param.dpriority, param.dcontent, param.dcategory, param.ddate,
    param.dstate, param.uid], function (res, result) {
    callback(res, result);
  });
}

function queryDayTask(sql, param, callback) {
  db.queryArgs(sql, [param.uid,param.ddate+"%"], function (res, result) {
    callback(res, result);
  })
}

module.exports = {
  selectUID: selectUID,
  addDayTask: addDayTask,
  queryDayTask: queryDayTask
};