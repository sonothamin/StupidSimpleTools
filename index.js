const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Function to get metadata from tools
function getToolMetadata(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const metaRegex = /\/\*\s*meta\s*:\s*({[^]*?})\s*\*\//;
    const match = fileContent.match(metaRegex);
    if (match) {
        console.log('Extracted metadata:', match[1]); // Log metadata
        return JSON.parse(match[1]);
    }
    return null;
}


// Function to get the list of tools
function getToolsList() {
    const toolsDir = path.join(__dirname, 'tools');
    console.log('Reading tools directory:', toolsDir); // Log the directory being read
    const files = fs.readdirSync(toolsDir);
    console.log('Files found in tools directory:', files); // Log the files found
    return files.map(file => {
        const filePath = path.join(toolsDir, file);
        console.log('Processing file:', filePath); // Log each file being processed
        const metadata = getToolMetadata(filePath);
        if (metadata) {
            console.log('Metadata for', file, ':', metadata); // Log metadata
            return {
                name: path.basename(file, '.js'),
                ...metadata
            };
        } else {
            console.log('No metadata found for', file); // Log if no metadata is found
        }
        return null;
    }).filter(tool => tool !== null);
}

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
