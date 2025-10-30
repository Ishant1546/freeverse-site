{
  "name": "freeverse-vault-site",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "node server.js",
    "build:css": "tailwindcss -i ./src/css/main.css -o ./dist/assets/main.css --minify",
    "render": "node build.js",
    "build": "npm run build:css && npm run render"
  },
  "dependencies": {
    "express": "^4.18.2",
    "ejs": "^3.1.9",
    "fs-extra": "^11.1.1"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.7",
    "postcss": "^8.4.24",
    "autoprefixer": "^10.4.14"
  }
}
