const { promises: fs } = require('fs');
const pdf = require('html-pdf');

const [_, __, htmlFile, pdfFile] = process.argv

const pdfOptions = {
    width: '297mm',
    height: '400mm',
    border: {
        top: "0.35in",
        bottom: "0.35in",
        left: "0.5in",
        right: "0.5in"
    },
};

async function main (inputFile, outputFile) {
    if (!(await fs.stat(htmlFile)).isFile())
        throw new Error ('Invalid html input file');

    const resumeContents = await fs.readFile(inputFile, 'utf-8');
    pdf.create(resumeContents, pdfOptions).toFile(outputFile, (error) => {
        if (error) {
            throw new Error(error)
        } else {
            console.log(`Pdf file generation done!`)
        }
    });
}

main(htmlFile, pdfFile)
    .catch(error => console.error(error.toString()));