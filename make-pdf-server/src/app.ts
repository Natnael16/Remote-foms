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
import console, { error } from "console";
const cloudinary = require("cloudinary").v2;
const fs = require('fs');
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


app.post("/create-pdf",uploader.uploadImage, async (req, res) => {
  
  try{

    console.log(req.body)
    const created_doc = await PdfForm.create(req.body)
    res.status(201).send({"Document" : created_doc})
    console.log(created_doc)

  }catch(error){
    console.log("error in body")
    res.status(401).send({"error" : error.message})
  } 

});

app.get("/fetch-pdf", async (req, res) => {
  try{
    const uploaded = await PdfForm.find().sort("-createdAt")
    res.status(200).send(uploaded)
  }catch(error){
    res.status(404).send({"error" : error.message})

  }
  
});


const generate = async (body) => {
  
  try {

  
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });

  // Create a new page
  const page = await browser.newPage();

  //Get HTML content from HTML file
  var contentHtml = fs.readFileSync(generatePdf(body), 'utf8');
  await page.setContent(contentHtml, { waitUntil: 'domcontentloaded' });

  // To reflect CSS used for screens instead of print
  await page.emulateMediaType('screen');

  // Downlaod the PDF
  const pdf = await page.pdf({
    landscape: true,
    path: 'generatedPdfs/result.pdf',
    format : "A4",
    printBackground: true
  });


  await browser.close();
  // res.json({pdf})
  }
  catch(e) {
    // res.json(e.message)
  }
}
export default app;
 