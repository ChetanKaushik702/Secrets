require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('db connected successfully!'))
.catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

userSchema.plugin(encrypt, {secret: process.env.SECRET_KEY, encryptedFields: ['password']});

const User = new mongoose.model('User', userSchema);

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/register', (req, res) => {
    res.render('register');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/register', (req, res) => {
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });
    newUser.save(err => {
        if (err) {
            console.log(err);
        } else {
            res.render('secrets');
        }
    });
})

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email: username}, (err, foundUser) => {
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                if (foundUser.password === password) {
                    res.render('secrets');
                }
            }
        }
    })
})


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})