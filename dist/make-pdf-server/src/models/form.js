"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const pdfSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please add your name"],
    },
    department: {
        type: String,
        required: [true, "Please add your department"],
    },
    regNo: {
        type: Number,
        unique: true,
        required: [true, "Please add your Registration No"],
    },
    id: {
        type: Number,
        unique: true,
        required: [true, "Please add your Id"],
    },
    image: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: [true, "Please add your phone"],
    },
}, { timestamps: true });
const PdfForm = mongoose_1.default.model("PdfForm", pdfSchema);
exports.default = PdfForm;
//# sourceMappingURL=form.js.map