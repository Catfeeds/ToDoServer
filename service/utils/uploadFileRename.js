const fs = require('fs');
const path = require('path');

module.exports = {
    Rename: function (req) {
        if (req.files && req.files[0] != null) {
            var newName = req.files[0].destination + "/" + req.files[0].filename + path.parse(req.files[0].originalname).ext;
            fs.rename(req.files[0].destination + "/" + req.files[0].filename, newName, function (err) {
                if (err) {
                    console.log('rename err!');
                }
            });
            return req.files[0].filename + path.parse(req.files[0].originalname).ext;
            ;
        } else {
            //默认的头像
            return "public.png";
        }
    }
}