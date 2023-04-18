const adminData = require("../util/admindata");
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
function addProductfileSeller(req, res) {
    let obj = [];
    const file_path = path.join(`${__dirname}`, `../uploads_file/${req.file.filename}`);
    fs.createReadStream(`${file_path}`)
        .pipe(csv({}))
        .on('data', (data) => obj.push(data))
        .on('end', () => {
            adminData.addProductfileSeller(obj,req.session.username, function (err) {
                if (err) {
                    res.send("fail");
                } else {
                    res.send("success");
                }
            })
        })

}
module.exports = addProductfileSeller;