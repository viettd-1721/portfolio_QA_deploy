// spawn a child process and execute shell command
// borrowed from https://github.com/mout/mout/ build script
// author Miller Medeiros
// released under MIT License
// version: 0.1.0 (2013/02/01)


var bash = document.getElementById("command-output");
const { ipcRenderer } = require('electron')

const process = require('child_process');

exports.exec = function(cmd){
    var child = process.exec(cmd);
    var ui = require('./update_ui_helper');


    var result_output = ''

    child.stdout.on('data', function (data) {
        result_output = data;
        ui.append_data_id('command-output', data);
    });

    child.stderr.on('data', function (data) {
        result_output = data;
        ui.append_data_id('command-output', 'stderr: <'+data+'>' );
    });

    var result = {cmd: cmd}
    child.on('close', function (code) {
        if (code == 0)
            result.code = 0
        else
            result.code = code

        result.data = result_output;
        ipcRenderer.sendSync('executed-message', {result})
    });
};


// execute multiple commands in series
// this could be replaced by any flow control lib
exports.series = function(cmds, cb){
    var execNext = function(){
        exports.exec(cmds.shift(), function(err){
            if (err) {
                cb(err);
            } else {
                if (cmds.length) execNext();
                else cb(null);
            }
        });
    };
    execNext();
};