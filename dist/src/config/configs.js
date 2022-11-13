"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DB_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;
const configs = {
    DB_URI,
    PORT,
    EMAIL,
    PASSWORD,
    JWT_SECRET
};
exports.default = configs;
//# sourceMappingURL=configs.js.map