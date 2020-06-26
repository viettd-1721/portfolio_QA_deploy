const { app, Menu, BrowserWindow, dialog } = require('electron')
const path = require('path')
let menuConfig = require("./settings/menu/menu");

var is = require("electron-is");
require('electron-reload')(__dirname);

const fs = require('fs');

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  var opsys = process.platform;
  if (opsys == "darwin") {
    opsys = "MacOS";
  } else if (opsys == "win32" || opsys == "win64") {
    opsys = "Windows";
  } else if (opsys == "linux") {
    opsys = "Linux";
  }

  const menu = Menu.buildFromTemplate(menuConfig['template'])
  Menu.setApplicationMenu(menu)

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  const { ipcMain } = require('electron')

  ipcMain.on('executed-message', (event, arg) => {
    event.returnValue = arg;
  })

  ipcMain.on('executed-message', (event, arg) => {
    event.reply('executed-reply', arg)
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

exports.getFileFromUser = (targetWindow) => {
  const files = dialog.showOpenDialog(targetWindow, {
    properties: ['openFile']});

  files.then(
      result => {
        if(result.filePaths.length > 0) {
          const content = fs.readFileSync('./settings/ssh_info.json').toString();
          const ssh_data = JSON.parse(content)
          ssh_data.path_key = result.filePaths[0];
          fs.writeFileSync('./settings/ssh_info.json', JSON.stringify(ssh_data));

          dialog.showMessageBox(targetWindow, {
            title: 'Updated success',
            type: 'info',
            message: 'The file has been imported successfully, please update it again if you move it elsewhere'
          })

        } else {

        }
      }).catch(err => {

      })
};

exports.getPasword = (targetWindow) => {
  const password_port = new BrowserWindow({
    width: 200,
    height: 100,
    webPreferences: {
      nodeIntegration: true,
    }
  })
  password_port.setMenu(null)
  password_port.setResizable(false)
  password_port.loadFile('./components/password_prompt/index.html')
};
