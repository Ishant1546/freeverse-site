const ejs = require('ejs');
const fs = require('fs-extra');
const path = require('path');

const site = require('./data/site.json');
const services = require('./data/services.json');
const plans = require('./data/plans.json');

const viewsDir = path.join(__dirname, 'src/views');
const distDir = path.join(__dirname, 'dist');
const assetsDir = path.join(distDir, 'assets');

fs.removeSync(distDir);
fs.ensureDirSync(distDir);
fs.ensureDirSync(assetsDir);

// copy static public files
fs.copySync(path.join(__dirname, 'src/public'), assetsDir);

// Render pages
const pages = [
  { src: 'index.ejs', out: 'index.html', data: { site, services, plans, pageTitle: 'Home' } },
  { src: 'services.ejs', out: 'services/index.html', data: { site, services, plans, pageTitle: 'Services' } },
  { src: 'plans.ejs', out: 'plans/index.html', data: { site, services, plans, pageTitle: 'Plans' } },
  { src: 'rewards.ejs', out: 'rewards/index.html', data: { site, services, plans, pageTitle: 'Rewards' } },
  { src: 'contact.ejs', out: 'contact/index.html', data: { site, services, plans, pageTitle: 'Contact' } }
];

pages.forEach(p => {
  const srcPath = path.join(viewsDir, p.src);
  const html = ejs.render(fs.readFileSync(srcPath, 'utf8'), p.data, { filename: srcPath });
  const outPath = path.join(distDir, p.out);
  fs.ensureDirSync(path.dirname(outPath));
  fs.writeFileSync(outPath, html);
  console.log('Built', outPath);
});

console.log('Static site build complete. Assets are in /dist/assets');
