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
    const files = fs.readdirSync(toolsDir);
    return files.map(file => {
        const filePath = path.join(toolsDir, file);
        const metadata = getToolMetadata(filePath);
        if (metadata) {
            return {
                name: path.basename(file, '.js'),
                ...metadata
            };
        }
        return null;
    }).filter(tool => tool !== null);
}

app.get('/', (req, res) => {
    const tools = getToolsList();
    res.render('index', { tools });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
