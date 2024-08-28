const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Function to get tool metadata from JSON files in /public/meta
function getToolsList() {
    const metaDir = path.join(__dirname, 'public', 'meta');
    const files = fs.readdirSync(metaDir);
    console.log('Metadata files found:', files); // Log metadata files found
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
