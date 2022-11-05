import express, {
  Application,
  Request,
  Response,
  NextFunction,
  json
} from "express";

import cors from "cors";
 
import generatePdf from "./documents/generatePDF"
import bodyParser from "body-parser";
import puppeteer from "puppeteer";






const app: Application = express();

const formData = require("express-form-data");
const os = require("os");
import PdfForm from "../src/models/form"
import uploader from '../src/utils/uploader';
import cloudinaryConfigs from "./utils/cloudinary";
const cloudinary = require("cloudinary").v2;
cloudinary.config(cloudinaryConfigs)


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

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(cors());

app.post("/create-pdf",async (req, res) => {

  const {name, id, phone, department, image, regNo} = req.body


  try{

  const uploadToCloudinary =  async (image) => {
  const res = await cloudinary.uploader.upload(image)
  return res
}
  const result = uploadToCloudinary(image.path)
  console.log(result)
  const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();

  //Get HTML content from HTML file
  await page.setContent(generatePdf(req.body), { waitUntil: 'domcontentloaded' });

  // To reflect CSS used for screens instead of print
  await page.emulateMediaType('screen');

  // Downlaod the PDF
  const pdf = await page.pdf({
    landscape: true,
    path: 'generatedPdfs/result.pdf',
    format : "A4"
  });

  await browser.close();
  res.json({pdf})
  }
  catch(e) {
    console.log(e.message)
  }
 
  
});
 
app.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/generatedPdfs/result.pdf`)
});

export default app;
 