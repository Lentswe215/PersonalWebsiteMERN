const fs = require("fs");
const path = require("path");

const SaveFile = (FileData, FilePath, FileName) => {
    try {
        const Base64Data = FileData.replace(/^data:image\/\w+;base64,/, '');
        const FileBuffer = Buffer.from(Base64Data, "base64");
        const SavePath = path.join(__dirname, Folder, FileName);
        console.log('====================================');
        console.log(SavePath);
        console.log('====================================');
        // fs.writeFile(path.join(__dirname, Folder, FileName),)
    } catch (e) {
        throw new Error("Save File Error ::", e);
    }
}

const GenerateFileName = (FileData) => {
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
    let result = "";
    // Convert the Base64 string to a buffer
    const buffer = Buffer.from(base64Data, 'base64');

    // Get the image type (extension)
    const type = imageType(buffer);
    console.log(type);
    if (type) {
        result = generateGUID() + "." + type.ext;
    } else {
        console.error('Unable to determine the file extension.');
    }

    return result;
}

const generateGUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

module.exports = { SaveFile, GenerateFileName };