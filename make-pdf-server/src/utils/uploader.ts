import multer from 'multer'
import {v2 as cloudinary} from 'cloudinary'
import cloudinaryConfigs from '../utils/cloudinary'
import {NextFunction, Request , Response} from 'express'


import DataURIParser from 'datauri/parser';


interface FileRequest extends Request{
    files: any;
}

/*
uploadImage: parses the photo
             uploads it to cloudinary and adds its URI to request body
             =>use req.body.photo to access the uri
*/
const uploadImage = async (req: FileRequest, res:Response, next:NextFunction) => {
  try {
    console.log(req.files.image.buffer)
    const { files } = req
    if (!files){
    
      next()
    }else{
      // console.log(files.image)
      const fileFormat = files.image.path.split('.')[1]
      const parser = new DataURIParser();
      const { base64 } = parser.format(fileFormat,files.image);
      const imageDetails = await uploadToCloudinary(base64, fileFormat) 
      req.body.image = imageDetails.url;
      next()
    }
  } catch (error) {
    console.log(req.files.image.read)
    res.json(error.message)
  }
}

cloudinary.config({
    cloud_name: cloudinaryConfigs.CLOUD_NAME,
    api_key: cloudinaryConfigs.CLOUD_API_KEY,
    api_secret: cloudinaryConfigs.CLOUD_API_SECRET,
    secure: true
});

const uploadToCloudinary = async (fileString: any, format: any) => {
    try {
      // const { uploader } = cloudinary;
      const res = await cloudinary.uploader.upload(
        `data:image/${format};base64,${fileString}`
      );
      return res;
    } catch (error) {
     throw new Error("cloudinary upload error")
    }
  };
  
  
const uploader = {
    uploadImage,
    uploadToCloudinary,
  };

export default uploader
