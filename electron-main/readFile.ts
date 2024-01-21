const fs = require("fs");

export const readFile = (filePath:any,callback)=>{
    let file = fs.createReadStream(filePath, {
        encoding: "utf-8"
    });
    file.on("open", function () {
        console.log("打开文件，开始读取内容")
    });

    file.on("data", function (data:any) {
        console.log("内容：", data)
        callback(data)
    });

    file.on("end", function () {
        console.log('文件读取结束')
    });

    file.on("close", function () {
        console.log("关闭文件")
    });

    file.on('error', function () {
        console.log("读取文件失败")
    });

}

