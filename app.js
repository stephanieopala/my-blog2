const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

//connect to db
const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.1rycc.mongodb.net/steph-blog?retryWrites=true&w=majority`;
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(result => app.listen(3000))
.catch(err => console.log(err));

//register view engine
app.set('view engine', 'ejs');

//middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//routing

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
})

app.get('/create', (req, res) => {
    res.render('create', { title: 'Create Blog'})
})
app.use( blogRoutes);

app.get('/404', (req,res) => {
    res.status(404).render('404', {title: "404"})
})