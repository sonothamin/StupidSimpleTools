const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// Serve tool scripts dynamically from /tools directory
app.get('/tools/:toolName', (req, res) => {
    const toolName = req.params.toolName;
    const toolPath = path.join(__dirname, 'tools', `${toolName}.js`);

    fs.access(toolPath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send('Tool not found');
        }
        res.setHeader('Content-Type', 'application/javascript');
        res.sendFile(toolPath);
    });
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Function to get tool metadata from JSON files in /public/meta
function getToolsList() {
    const metaDir = path.join(__dirname, 'public', 'meta');
    const files = fs.readdirSync(metaDir);
    return files.map(file => {
        const filePath = path.join(metaDir, file);
        const metadata = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        return {
            name: path.basename(file, '.meta.json'),
            ...metadata
        };
    });
}

// Route to render the index page with tools
app.get('/', (req, res) => {
    const tools = getToolsList();
    res.render('index', { tools });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
