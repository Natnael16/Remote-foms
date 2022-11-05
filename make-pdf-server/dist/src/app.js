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
const generatePDF_1 = __importDefault(require("./documents/generatePDF"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const formdataParser = require('multer');
const app = (0, express_1.default)();
const formData = require("express-form-data");
const os = require("os");
/**
 * Options are the same as multiparty takes.
 * But there is a new option "autoClean" to clean all files in "uploadDir" folder after the response.
 * By default, it is "false".
 */
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
app.post("/create-pdf", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("server called", req.body);
    console.log(req.files);
    const browser = yield puppeteer_1.default.launch();
    // Create a new page
    const page = yield browser.newPage();
    //Get HTML content from HTML file
    yield page.setContent((0, generatePDF_1.default)(req.body), { waitUntil: 'domcontentloaded' });
    // To reflect CSS used for screens instead of print
    yield page.emulateMediaType('screen');
    // Downlaod the PDF
    const pdf = yield page.pdf({
        landscape: true,
        path: 'generatedPdfs/result.pdf',
        format: "A4"
    });
    yield browser.close();
    res.json({ pdf });
}));
app.get("/fetch-pdf", (req, res) => {
    res.sendFile(`${__dirname}/generatedPdfs/result.pdf`);
});
exports.default = app;
//# sourceMappingURL=app.js.map