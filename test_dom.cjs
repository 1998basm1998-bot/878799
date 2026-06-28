const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('index.html', 'utf8');
const js = fs.readFileSync('script.js', 'utf8');

const dom = new JSDOM(html, { runScripts: "dangerously" });
try {
  dom.window.eval(js);
  console.log("Script executed without errors.");
} catch (e) {
  console.error("Error executing script:", e);
}
