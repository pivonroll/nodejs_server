var fs = require('fs');
var pdf = require('html-pdf');
var options = { format: 'Letter' };

function create(htmlFilePath) {
    var html = fs.readFileSync(htmlFilePath, 'utf8');
    pdf.create(html, options).toFile('./businesscard.pdf', function(error, response) {
        if (error) {
            return console.log(error);
        }
        console.log(response); // { filename: '/app/businesscard.pdf' }
    });
}

module.exports = {
    create: create
};
