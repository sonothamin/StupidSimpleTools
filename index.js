const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const toolsDir = path.join(__dirname, 'tools');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Function to extract metadata from a tool's JS file
function getToolMetadata(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const metadataMatch = fileContent.match(/\/\*\s*meta\s*\{(.*?)\}\s*\*\//s);

    if (metadataMatch && metadataMatch[1]) {
        try {
            return JSON.parse(metadataMatch[1]);
        } catch (error) {
            console.error(`Error parsing metadata for ${filePath}:`, error);
        }
    }

    return null;
}

// Scanning the tools directory and gathering metadata
function getToolsList() {
    const files = fs.readdirSync(toolsDir);
    const tools = files.map(file => {
        const metadata = getToolMetadata(path.join(toolsDir, file));
        if (metadata) {
            return {
                name: path.basename(file, '.js'),
                ...metadata
            };
        }
        return null;
    }).filter(tool => tool !== null);

    return tools;
}

app.get('/', (req, res) => {
    const tools = getToolsList();
    res.render('index', { tools });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
