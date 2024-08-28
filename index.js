const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// Set up view engine and directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve tool scripts dynamically
app.get('/tools/:toolName', (req, res) => {
    const toolName = req.params.toolName;
    const toolPath = path.join(__dirname, 'tools', `${toolName}.js`);
    
    console.log(`Request for tool: ${toolName}`);

    fs.access(toolPath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error(`Tool not found: ${toolPath}`);
            return res.status(404).send('Tool not found');
        }

        console.log(`Serving tool: ${toolPath}`);
        res.sendFile(toolPath, (err) => {
            if (err) {
                console.error(`Error sending file: ${err}`);
                res.status(500).send('Error serving file');
            }
        });
    });
});

// Function to get tool metadata from JSON files in /public/meta
function getToolsList() {
    const metaDir = path.join(__dirname, 'public', 'meta');
    console.log(`Reading metadata from directory: ${metaDir}`);

    let tools = [];
    try {
        const files = fs.readdirSync(metaDir);
        tools = files.map(file => {
            const filePath = path.join(metaDir, file);
            try {
                const metadata = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                console.log(`Loaded metadata for tool: ${file}`);
                return {
                    name: path.basename(file, '.meta.json'),
                    ...metadata
                };
            } catch (err) {
                console.error(`Error parsing JSON file: ${filePath}, Error: ${err}`);
                return null;
            }
        }).filter(tool => tool !== null);
    } catch (err) {
        console.error(`Error reading metadata directory: ${metaDir}, Error: ${err}`);
    }

    return tools;
}

// Route to render the index page with tools
app.get('/', (req, res) => {
    console.log('Rendering index page');
    try {
        const tools = getToolsList();
        res.render('index', { tools }, (err, html) => {
            if (err) {
                console.error(`Error rendering index page: ${err}`);
                res.status(500).send('Error rendering page');
            } else {
                res.send(html);
            }
        });
    } catch (err) {
        console.error(`Error in root route handler: ${err}`);
        res.status(500).send('Server error');
    }
});

// Handle 404 errors for other routes
app.use((req, res) => {
    console.error(`404 Not Found: ${req.originalUrl}`);
    res.status(404).send('Page not found');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
