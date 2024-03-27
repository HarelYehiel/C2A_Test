/*
1. Compare & Assert the Texts of 2 PDF Files.
Create a test that will assert true if 2 PDFs files’ text is the same
You can create 2 simple pdfs with different texts in each – add them to your cypress project.
*/

const fs = require('fs');
const PDFParser = require('pdf-parse');

// Define a function to extract text from a PDF file
async function extractTextFromPDF(filePath) {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await PDFParser(dataBuffer);
    return data.text;
}
// Define a function to compare two PDF files
async function comparePDFs(pdf1Path, pdf2Path) {
    const text1 = await extractTextFromPDF(pdf1Path);
    const text2 = await extractTextFromPDF(pdf2Path);

    // Remove whitespace and line breaks for comparison
    const cleanText1 = text1.replace(/\s+/g, ' ').trim();
    const cleanText2 = text2.replace(/\s+/g, ' ').trim();

    return cleanText1 === cleanText2;
}

// Import the 'path' module if you're in a Node.js environment
const path = require('path');

// Get the current script's directory
const scriptDir = __dirname;

// Construct a relative path to your files
const pdf1Path = path.join(scriptDir, 'file1.pdf');
const pdf2Path = path.join(scriptDir, 'file2.pdf');

console.log(`Relative file path: ${pdf1Path}`);
console.log(`Relative file path: ${pdf2Path}`);

// Compare the PDFs and assert the result
comparePDFs(pdf1Path, pdf2Path)
    .then((result) => {
        if (result) {
            console.log('True: The text content of the two PDFs is the same.');
        } else {
            console.log('False: The text content of the two PDFs is different.');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
