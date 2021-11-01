const express = require('express');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/register', (req, res) => {
    res.render('register');
})

app.get('/login', (req, res) => {
    res.render('login');
})


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})