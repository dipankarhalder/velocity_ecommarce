// /** Node modules */
// const path = require('path');
// const UploadedFile = require('../models/uploadedFile.js');

// /** Save uploaded file info to DB */
// const saveUploadedFile = async (file, module, moduleId) => {
//   const uploadedFile = await UploadedFile.create({
//     filename: file.filename,
//     path: path.join('uploads', file.filename),
//     module,
//     moduleId,
//     used: true,
//   });
//   return uploadedFile;
// };

// /** Mark previous images for this entity/module as unused */
// const markPreviousImagesUnused = async (module, moduleId, currentFileId) => {
//   await UploadedFile.updateMany({ module, moduleId, used: true, _id: { $ne: currentFileId } }, { $set: { used: false } });
// };

// module.exports = { saveUploadedFile, markPreviousImagesUnused };
