const fs = require('fs');

exports.onPreInit = () => {
    fs.readdirSync('./src/data').forEach((file) => {
        // Write to txt files the questions
        var questionOnlyFileStream = fs.createWriteStream(
            `./static/${file.split('.')[0]}.txt`,
        );
        questionOnlyFileStream.on('error', function (err) {
            console.log(err);
        });

        fs.readFile(`./src/data/${file}`, 'utf8', (err, jsonString) => {
            if (err) {
                console.log('File read failed:', err);
                return;
            }
            jsonFile = JSON.parse(jsonString);
            Object.keys(jsonFile).forEach(function (v) {
                questionOnlyFileStream.write(`${v}\n`);
            });
            questionOnlyFileStream.end();
        });

        // Write to txt file the questions and resources
        var questionAndResourceStream = fs.createWriteStream(
            `./static/${file.split('.')[0]}_and_resources.txt`,
        );
        questionAndResourceStream.on('error', function (err) {
            console.log(err);
        });

        fs.readFile(`./src/data/${file}`, 'utf8', (err, jsonString) => {
            if (err) {
                console.log('File read failed:', err);
                return;
            }
            jsonFile = JSON.parse(jsonString);
            Object.keys(jsonFile).forEach(function (v) {
                questionAndResourceStream.write(`Question: ${v}\n`);
                questionAndResourceStream.write(`Comments:\n`);
                questionAndResourceStream.write(`${jsonFile[v].comment}\n`);
                questionAndResourceStream.write(`\n`);
                questionAndResourceStream.write(`Resources:\n`);
                jsonFile[v].resources.map((url) => {
                    questionAndResourceStream.write(`${url}\n`);
                });
                questionAndResourceStream.write(`\n`);
                questionAndResourceStream.write(
                    `---------------------------------------\n`,
                );
            });
            questionAndResourceStream.end();
        });
    });
};
