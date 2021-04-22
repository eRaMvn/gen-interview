const fs = require('fs');

const getQuestionByTags = (jsonFile, topic) => {
    const tagDict = {};
    tagDict[topic] = [];

    Object.keys(jsonFile).forEach(function (v) {
        for (let eachTag of jsonFile[v]['tags']) {
            if (!(eachTag in tagDict)) {
                tagDict[eachTag] = [];
            }
            tagDict[eachTag].push(v);
        }
        tagDict[topic].push(v);
    });

    return tagDict;
};

exports.onPreInit = () => {
    fs.readdirSync('./src/data').forEach((file) => {
        fs.readFile(`./src/data/${file}`, 'utf8', (err, jsonString) => {
            if (err) {
                console.log('File read failed:', err);
                return;
            }
            jsonFile = JSON.parse(jsonString);
            const allQs = getQuestionByTags(
                jsonFile,
                `all_${file.split('_questions')[0]}`,
            );

            Object.keys(allQs).forEach(function (v) {
                // Write to txt files the questions
                var questionOnlyFileStream = fs.createWriteStream(
                    `./static/${v}_questions.txt`,
                );
                questionOnlyFileStream.on('error', function (err) {
                    console.log(err);
                });
                for (let question of allQs[v]) {
                    questionOnlyFileStream.write(`${question}\n`);
                }
                questionOnlyFileStream.end();

                // Write to txt file the questions and resources by tags
                var questionAndResourceStream = fs.createWriteStream(
                    `./static/${v}_questions_and_resources.txt`,
                );
                questionAndResourceStream.on('error', function (err) {
                    console.log(err);
                });
                for (let question of allQs[v]) {
                    questionAndResourceStream.write(`Question: ${question}\n`);
                    questionAndResourceStream.write(`Comments:\n`);
                    questionAndResourceStream.write(
                        `${jsonFile[question].comment}\n`,
                    );
                    questionAndResourceStream.write(`Resources:\n`);
                    questionAndResourceStream.write(
                        `${jsonFile[question].resources}\n`,
                    );
                    questionAndResourceStream.write(
                        `---------------------------------------------\n`,
                    );
                }
                questionAndResourceStream.end();
            });
        });
    });
};
