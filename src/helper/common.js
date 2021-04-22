export const getQuestionByTags = (jsonFile, topic) => {
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

export const setDropDownValues = (tagDict) => {
    const questionTypes = [];
    Object.keys(tagDict).forEach(function (v) {
        questionTypes.push({ key: v, value: v, text: v });
    });
    return questionTypes;
};
