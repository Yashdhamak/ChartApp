const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const loadData = () => {
    const dataPath = path.join(__dirname, 'data', 'data.json');
    if (!fs.existsSync(dataPath)) {
        return {};
    }
    const rawData = fs.readFileSync(dataPath);
    return JSON.parse(rawData);
};

const saveData = (data) => {
    const dataPath = path.join(__dirname, 'data', 'data.json');
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

app.get('/', (req, res) => {
    const data = loadData();
    res.render('index', { data });
});

app.post('/submit', (req, res) => {
    const { number } = req.body;

    if (!number || isNaN(number) || number < 1 || number > 100) {
        return res.status(400).send('Invalid input. Please enter a number between 1 and 100.');
    }

    const data = loadData();
    data[number] = (data[number] || 0) + 1;
    saveData(data);

    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
