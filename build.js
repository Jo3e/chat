var stealTools = require("steal-tools");

var buildPromise = stealTools.build({
  config: __dirname + "/package.json!npm"
}, {
  bundleAssets: {
    infer: false
  }
});

var cordovaOptions = {
  buildDir: "./build/cordova",
  id: "com.donejs.chat",
  name: "DoneJS chat",
  platforms: ["ios"],
  index: __dirname + "/app.html",
  glob: [
    "node_modules/steal/steal.production.js"
  ]
};

var stealCordova = require("steal-cordova")(cordovaOptions);

// Check if the cordova option is passed.
var buildCordova = process.argv.indexOf("cordova") > 0;

if(buildCordova) {
  buildPromise.then(stealCordova.build).then(stealCordova.ios.emulate);
}

var nwOptions = {
  buildDir: "./build",
  platforms: ["osx"],
  files: [
    "package.json",
    "app.html",

    "node_modules/steal/steal.production.js",
    "node_modules/place-my-order-assets/images/**/*"
  ],
  version: "0.12.3"
};

var stealNw = require("steal-nw");

// Check if the cordova option is passed.
var buildNW = process.argv.indexOf("nw") > 0;

if(buildNW) {
  buildPromise = buildPromise.then(function(buildResult){
    console.log("NW")
    stealNw(nwOptions, buildResult);
  });
}