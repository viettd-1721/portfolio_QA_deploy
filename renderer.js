// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// process.
var shell = require('./helper/shellHelper');

update_current_branch();

// selectively enable features needed in the rendering
function update_current_branch() {
  document.getElementById('current_branch').innerHTML = 'testttttttttt'
}

shell.exec('touch ~/dcmm.test')