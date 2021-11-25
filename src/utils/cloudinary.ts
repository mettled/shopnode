//@ts-nocheck

import cloudinary from 'cloudinary.v2';

console.log(cloudinary.config().CLOUDINARY_URL);

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
