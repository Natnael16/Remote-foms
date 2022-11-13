"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
/*
uploadImage: parses the photo
             uploads it to cloudinary and adds its URI to request body
             =>use req.body.photo to access the uri
*/
const uploadImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { files } = req;
        const image = files.image;
        if (!files) {
            next();
        }
        else {
            const uploadToCloudinary = (image) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const res = yield cloudinary_1.v2.uploader.upload(image);
                    return res;
                }
                catch (e) {
                    return null;
                }
            });
            const cloud_result = yield uploadToCloudinary(image.path);
            if (cloud_result) {
                req.body.image = cloud_result.url;
                next();
            }
        }
    }
    catch (error) {
        res.json(error.message);
    }
});
const uploader = {
    uploadImage,
};
exports.default = uploader;
//# sourceMappingURL=uploader.js.map