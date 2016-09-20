'use strict';

var fs = require('fs');
var path = require('path')
var router = require('express').Router();

function readFiles(dirname, onFileContent, onError) {
    fs.readdir(dirname, function(err, filenames) {
        if (err) {
            onError(err);
            return;
        }
        filenames.forEach(function(filename) {
            fs.readFile(dirname + filename, 'utf-8', function(err, content) {
                if (err) {
                    onError(err);
                    return;
                }
                onFileContent(dirname + filename, content);
            });
        });
    });
}

var data = [];
readFiles(path.join(__dirname, 'phones/'), function(filename, content) {
    var name = path.basename(filename)
    data.push(name);
}, function(err) {
    throw err;
});

function select(howMany) {
    var result = [];
    for (var i = 0; i < howMany; i++) {
        var selected = Math.floor(Math.random() * (data.length));
        result.push('http://localhost:3100/phones/' + data[selected]);
    }
    return result;
}
router.get('/:name', function(request, response) {
    var image = request.params.name
    response.writeHead(200, {
        "Pragma": "public",
        "Cache-Control": "max-age=86400",
        "Expires": new Date(Date.now() + 86400000).toUTCString(),
        "Content-Type": "application/octet-stream",
        "Content-Disposition": "attachment; filename=" + image
    });
    fs.createReadStream(path.join(__dirname, 'phones/', image)).pipe(response);
});
module.exports = {
    router,
    selectImages: select
};
