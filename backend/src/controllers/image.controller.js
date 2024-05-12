const { uploadOnCloudinary } = require("../utils/cloudinary.utils");

exports.uploadimg = async(req, res, next) => {
    try {
        const fileUrl = await uploadOnCloudinary(req.file.path);
        if(fileUrl){
          return res.status(200).json({
            success: true,
            data: fileUrl.url
          });
        }
        else{
          const error = new Error("Something went wrong while uploading");
          next(error);
        }
      } catch (err) {
        next(err);
      }
};