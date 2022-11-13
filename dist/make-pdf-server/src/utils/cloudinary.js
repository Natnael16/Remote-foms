"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const CLOUD_NAME = process.env.CLOUD_NAME;
const CLOUD_API_KEY = process.env.CLOUD_API_KEY;
const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;
const FOLDER_NAME = process.env.FOLDER_NAME;
const CLOUDINARY_URL = process.env.CLOUDINARY_URL;
const cloudinaryConfigs = {
    CLOUD_NAME,
    CLOUD_API_KEY,
    CLOUD_API_SECRET,
    FOLDER_NAME,
    CLOUDINARY_URL
};
exports.default = cloudinaryConfigs;
//# sourceMappingURL=cloudinary.js.map