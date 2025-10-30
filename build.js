// build.js — fixed version for Netlify build

const ejs = require('ejs');
const fs = require('fs-extra');
const path = require('path');

// Load data
const site = require('./data/site.json');
const services = require('./data/services.json');
const plans = require('./data/plans.json');

// Define directories
const viewsDir = path.join(__dirname, 'src', 'views');
const distDir = path.join(__dirname, 'dist');
const assetsDir = path.join(distDir, 'assets');
const publicDir = path.join(__dirname, 'src', 'public');

// Clean and recreate dist folders
fs.removeSync(distDir);
fs.ensureDirSync(distDir);
fs.ensureDirSync(assetsDir);

// Copy public assets
if (fs.existsSync(publicDir)) {
  fs.copySync(publicDir, assetsDir);
}

// Define pages to render
const pages = [
  { src: 'index.ejs', out: 'index.html', data: { site, services, plans, pageTitle: 'Home' } },
  { src: 'services.ejs', out: 'services/index.html', data: { site, services, plans, pageTitle: 'Services' } },
  { src: 'plans.ejs', out: 'plans/index.html', data: { site, services, plans, pageTitle: 'Plans' } },
  { src: 'rewards.ejs', out: 'rewards/index.html', data: { site, services, plans, pageTitle: 'Rewards' } },
  { src: 'contact.ejs', out: 'contact/index.html', data: { site, services, plans, pageTitle: 'Contact' } }
];

// Render all EJS pages to HTML
pages.forEach(page => {
  try {
    const srcPath = path.join(viewsDir, page.src);
    const template = fs.readFileSync(srcPath, 'utf8');
    const html = ejs.render(template, page.data, { filename: srcPath });

    const outPath = path.join(distDir, page.out);
    fs.ensureDirSync(path.dirname(outPath));
    fs.writeFileSync(outPath, html);

    console.log(`✅ Built: ${page.out}`);
  } catch (err) {
    console.error(`❌ Error building ${page.src}:`, err);
  }
});

console.log('\n🎉 Static site build complete! Files are in /dist\n');
