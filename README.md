# Age Calculator PWA

![Design preview for the Age calculator app coding challenge](./age-calculator-pwa/design/desktop-preview.jpg)

A progressive Web App (PWA) that calculates the age of a user based on their date of birth.
The app supports multiple languages (English and French) and adheres to the best practices for accessibility, performance and SEO.

## Table of contents

- [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Links](#links)
  - [Technologies Used](#technologies-used)
  - [Manifest File](#manifest-file)
  - [Service Workers](#service-workers)
  - [Configuration](#configuration)
  - [Contributing](#contributing)
  - [Author](#author)
  - [Acknowledgments](#acknowledgments)

**To do this challenge, you need a decent understanding of HTML, CSS and JavaScript.**

## Features
- Calculate age in months, years and days.
- Multilingual support (English and French).
- PWA functionality with offline support.
- Optimized for performance, accessibility and SEO.
- Responsive Design.

## Installation

1. Clone the repository
```bash
  git clone
  https://github.com/devjhex/age-calculator-pwa.git
```
2. Navigate to the project directory
```bash
  cd age-calculator-pwa
```
3. Install the dependencies
```bash
  npm install
```


## Usage
1. Run the development server:
```bash
  npm run dev
```
2. Open your browser and go to `http://localhost:3000` 

## Technologies Used

- **HTML/CSS**: For structure and Styling
- **JavaScript**: For functionality
- **TailwindCSS**: For utility-first CSS
- **PostCSS**: For processing CSS
- **Webpack**: For bundling JavaScript files.
- **Babel**: For JavaScript transpilation
- **Service Workers**: For offline functionality
- **Lighthouse**:For performance, accessibility, and SEO auditing

## Manifest File
```json
  {
    "name":"Age Calculator",
    "short_name":"AgeCalc",
    "description":"Calculate your exact age in years, months and days.",
    "start_url":"/index.html",
    "display":"standalone",
    "background_color":"#dbdbdb",
    "theme_color":"#854dff",
    "icons":[
        {
            "src":"./assets/images/resizedIcons/logo48.jpg",
            "sizes":"48x48",
            "type":"image/jpeg",
            "purpose":"any"
        },
        {
            "src":"./assets/images/resizedIcons/logo72.jpg",
            "sizes":"72x72",
            "type":"image/jpeg",
            "purpose":"any"
        },
        {
            "src":"./assets/images/resizedIcons/logo96.jpg",
            "sizes":"96x96",
            "type":"image/jpeg",
            "purpose":"any"
        },
        {
            "src":"./assets/images/resizedIcons/logo144.jpg",
            "sizes":"144x144",
            "type":"image/jpeg",
            "purpose":"maskable"
        },
    ],
    "screenshots":[
        {
            "src":"./design/desktop-design.jpg",
            "sizes":"1440x960",
            "type":"image/jpeg",
            "form_factor":"wide"
        },
        {
            "src":"./design/mobile-design.jpg",
            "sizes":"375x812",
            "type":"image/jpeg",
            "form_factor":"narrow"
        }
    ],
    "scope":"/",
    "orientation":"portrait",
    "lang":"en",
    "dir":"ltr"
}
```

## Service Workers
Service workers are used to enable offline functionality and caching. Here is a basic example of a basic service worker setup:
```js
const CACHE_NAME = "my-app-cache-v1";

const urlsToCache = [
    "/index.html",
    "/output.css",
    "/scripts/main.js",
    "/assets/images/ageCalcon.jpg"
];

self.addEventListener("install", (event)=>{
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache=>{
            return cache.addAll(urlsToCache);
        })
        .then(()=>{
            console.log("Caching completed successfully");
        }).catch(error=>{
            console.error("Caching failed:", error);
        })
    )
});

self.addEventListener("fetch", (event)=>{
    event.respondWith(
        caches.match(event.request)
        .then(response=>{
            return response || fetch(event.request);
        })
    );
})
```


## Configuration
  ### Tailwind CSS
  To build and minfiy CSS for production use the following commands.
```bash
  npm run build:css:prod
```
  ### Webpack
  Webpack is configured to bundle and minfiy JavaScript files. Example configuration:

  ```js
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { fileURLToPath } = require('url');

module.exports = {
    mode:'production',
    entry:'./scripts/main.js',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname, 'dist'),
    },
    devtool:'source-map',
    plugins:[new CleanWebpackPlugin(),],
    optimization:{
        minimize:true,
        minimizer:[new TerserPlugin(
            {
                terserOptions:{
                    sourceMap:true,
                }
            }
        )],
    },
};
```

## Contributing
1. Fork the repository
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes.
4. Commit your changes (git commit -m 'Add some feature')
5. Push to the branch (git push origin feature-branch)
6. Open a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

**Have fun building!** 🚀


