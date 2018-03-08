const todoService=require('../service/todoService');
const fs = require('fs');
const json = "./service/conf/ServiceConfig.json";
const Sql = JSON.parse(fs.readFileSync(json));
const is = require('../service/utils/is')
/*
    添加任务Model
 */
    function addModel(req,res) {
        if (req.method == 'POST') {
            var param = req.body;
        } else {
            var param = req.query || req.params;
        }
        todoService.selectUID(Sql.SQLCommands.sql_selectUID,param,function (err,result) {
           if (err){
               result={
                  errcode: -1,
                   errmsg: err + '服务器错误'
               }
               res.send(result);
           }else {
               if (result==''){
                   result={
                       errcode: 404,
                       errmsg:   '用户未找到'
                   }
                   res.send(result)
               }else {
                   //添加用户逻辑
                todoService.addDayTask(Sql.SQLCommands.sql_add_daytask,param,function (err,result) {
                    if (err){
                        result={
                            errcode: -1,
                            errmsg: err + '服务器错误'
                        }
                        res.send(result);
                    }else {
                       if (result==''){
                            result={
                                errcode:-1,
                                errmsg:'添加任务失败'
                            }
                            res.send(result);
                        }else {
                            result={
                                errcode:200,
                                errmsg:'添加任务成功'
                            }
                            res.send(result);
                        }
                    }
                });
               }
           }
        });
    }

    function queryDayTask(req, res) {
      if (req.method == 'POST') {
        var param = req.body;
      } else {
        var param = req.query || req.params;
      }
      if (is.isDate(param.ddate)){
        todoService.queryDayTask(Sql.SQLCommands.sql_query_daytask, param, function (err, result) {
          if (err){
            result={
              errcode: -1,
              errmsg: err + '服务器错误'
            }
            res.send(result);
          }else {
            if (result==''){
              result={
                errcode:-1,
                errmsg:'查询结果为空'
              }
              res.send(result);
            }else {
              res.send(result);
            }
          }
        })
      }else {
        res.send({error: -1,errmsg: "时间格式不正确"});
      }

    }

module.exports={
        addModel:addModel,
  queryDayTask:queryDayTask
}
