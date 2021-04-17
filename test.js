const fs = require('fs');

// var file = fs.createWriteStream('array.txt');
// file.on('error', function (err) {
//     console.log(err);
// });

// fs.readFile('./behavioral.json', 'utf8', (err, jsonString) => {
//     if (err) {
//         console.log('File read failed:', err);
//         return;
//     }
//     jsonFile = JSON.parse(jsonString);
//     Object.keys(jsonFile).forEach(function (v) {
//         file.write(v + '\n');
//     });
//     file.end();
// });

fs.readdirSync('./').forEach((file) => {
    console.log(file);
});
