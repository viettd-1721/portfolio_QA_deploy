var bash = document.getElementById("command-output");
const { ipcRenderer } = require('electron')
const process = require('child_process');

exports.exec = function(cmd){
    var ui = require('./update_ui_helper');
    ui.update_view_id('lastest_command', cmd);
    ui.update_background_id('lastest_command', 'yellow');

    var child = process.exec(cmd);

    var result_output = ''

    child.stdout.on('data', function (data) {
        result_output = data;
        ui.append_value_id('command-output', data);
    });

    child.stderr.on('data', function (data) {
        result_output = data;
        ui.append_value_id('command-output', 'stderr: <'+data+'>' );
    });

    var result = {cmd: cmd}
    child.on('close', function (code) {
        if (code == 0){
            result.code = 0
            ui.update_background_id('lastest_command', 'green')
            result.data = result_output;
        } else {
            ui.update_background_id('lastest_command', 'red')
            result.code = code
            result.data = 'N/A'
        }
        ipcRenderer.sendSync('executed-message', {result})
    });
};

var activities = document.getElementById("activitySelector");