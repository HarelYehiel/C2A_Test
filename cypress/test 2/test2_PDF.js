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

// Specify the paths to the two PDF files you want to compare
const pdf1Path = 'C:/Users/POSEIDON/Projects/C2A Test/C2A_Test/cypress/test 2/file1.pdf';
const pdf2Path = 'C:/Users/POSEIDON/Projects/C2A Test/C2A_Test/cypress/test 2/file3.pdf';

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
