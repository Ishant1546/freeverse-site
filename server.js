const express = require('express');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs-extra');

const app = express();
const PORT = process.env.PORT || 3000;

const site = require('./data/site.json');
const services = require('./data/services.json');
const plans = require('./data/plans.json');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.use('/assets', express.static(path.join(__dirname, 'dist/assets')));

// Helper to render pages from EJS with injected data
app.get('/', (req, res) => res.render('index.ejs', { site, services, plans, pageTitle: 'Home' }));
app.get('/services', (req, res) => res.render('services.ejs', { site, services, plans, pageTitle: 'Services' }));
app.get('/plans', (req, res) => res.render('plans.ejs', { site, services, plans, pageTitle: 'Plans' }));
app.get('/rewards', (req, res) => res.render('rewards.ejs', { site, services, plans, pageTitle: 'Rewards' }));
app.get('/contact', (req, res) => res.render('contact.ejs', { site, services, plans, pageTitle: 'Contact' }));

app.listen(PORT, () => console.log(`Server listening: http://localhost:${PORT}`));
