const fs = require('fs-extra');
const concat = require('concat');    

(async function build() {

	console.log("in js file");

    const files =[
     	'./dist/ng-element-chatBotUI/runtime-es5.js',
        './dist/ng-element-chatBotUI/polyfills-es5.js',
        './dist/ng-element-chatBotUI/main-es5.js',
        // './dist/ng-element-chatBotUI/runtime-es2015.js',
        // './dist/ng-element-chatBotUI/polyfills-es2015.js',
        // './dist/ng-element-chatBotUI/main-es2015.js',

    ]
    
    await fs.ensureDir('elements')
    
    await concat(files, 'elements/ng-chatbot-element.js')
    console.info('Angular Elements created successfully!')

})()
