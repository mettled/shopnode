"use strict";
//@ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cloudinary_v2_1 = __importDefault(require("cloudinary.v2"));
console.log(cloudinary_v2_1.default.config().CLOUDINARY_URL);
// .upload_stream({ resource_type: 'auto' }, (error, result) => {
//   console.log(error, result);
//   if (error || !result) {
//     return res.status(500).json({
//       status: 'error',
//       message: error || 'upload error',
//     });
//   }
//   res.status(201).json({
//     url: result.url,
//     size: Math.round(result.bytes / 1024),
//     height: result.height,
//     width: result.width,
//   });
// }).
