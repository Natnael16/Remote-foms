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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import { exportImages } from "pdf-into-jpg";
const generatePDF_1 = __importDefault(require("./documents/generatePDF"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const app = (0, express_1.default)();
const formData = require("express-form-data");
const os = require("os");
const form_1 = __importDefault(require("../src/models/form"));
const uploader_1 = __importDefault(require("../src/utils/uploader"));
const cloudinary_1 = __importDefault(require("./utils/cloudinary"));
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
cloudinary.config(cloudinary_1.default);
const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
};
// parse data with connect-multiparty.
app.use(formData.parse(options));
// delete from the request all empty files (size == 0)
app.use(formData.format());
// change the file objects to fs.ReadStream
app.use(formData.stream());
// union the body and the files
app.use(formData.union());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.status(200).send("working properly");
});
app.post("/create-pdf", uploader_1.default.uploadImage, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const created_doc = yield form_1.default.create(req.body);
        res.status(201).send({ Document: created_doc });
    }
    catch (error) {
        res.status(204).send({ error: error.message });
    }
}));
app.post("/fetch-pdf", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    function escapeRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }
    try {
        if (req.body.name) {
            req.body.name = { $regex: new RegExp(escapeRegex(req.body.name), "gi") };
        }
        else {
            req.body = {};
        }
        const uploaded = yield form_1.default.find(req.body).sort("-createdAt");
        res.status(200).send(uploaded);
    }
    catch (error) {
        res.status(404).send({ error: error.message });
    }
}));
app.post("/download-pdf", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pdf = yield generate(req.body);
        console.log("downloading ...");
        // var pdftoimage = require("pdftoimage");
        // var file = pdf;
        // // Returns a Promise
        // pdftoimage(file, {
        //   format: "jpg", // png, jpeg, tiff or svg, defaults to png
        //   prefix: `${req.body.name}${req.body.regNo}`, // prefix for each image except svg, defaults to input filename
        //   // / path to output directory, defaults to current directory
        // })
        //   .then(() => {
        //     console.log("Conversion done");
        //   })
        //   .catch((err) =>{
        //     console.log(err.message);
        //   });
        res.download(`${__dirname}/${req.body.name}${req.body.regNo}.pdf`);
        setTimeout(function () {
            fs.unlink(`${__dirname}/${req.body.name}${req.body.regNo}.pdf`, (err) => {
                if (err) {
                    console.log("delete failed");
                }
                // console.log(
                //   "FILE [" +
                //     `${__dirname}/${req.body.name}${req.body.regNo}.pdf` +
                //     "] REMOVED!"
                // );
            });
        }, 60000);
    }
    catch (error) {
        res.status(501);
    }
}));
app.delete("/delete-pdf/:regNo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield form_1.default.deleteOne({ regNo: req.params.regNo });
        res.status(204).json("Delete successful");
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
const generate = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const browser = yield puppeteer_1.default.launch({
            // headless: false,
            args: ["--no-sandbox"]
        });
        // Create a new page
        const page = yield browser.newPage();
        var html = (0, generatePDF_1.default)(body);
        //Get HTML content from HTML file
        yield page.setContent(html, { waitUntil: "networkidle0" });
        // To reflect CSS used for screens instead of print
        yield page.emulateMediaType("screen");
        // Downlaod the PDF
        const pdf = yield page.pdf({
            landscape: true,
            path: `src/${body.name}${body.regNo}.pdf`,
            format: "A4",
            printBackground: true
        });
        yield browser.close();
        return pdf;
    }
    catch (e) {
        return null;
    }
});
exports.default = app;
//# sourceMappingURL=app.js.map