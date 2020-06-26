const isMac = process.platform === 'darwin'
const mainProcess = require('../../main');


module.exports = {
  template:
    [
      // { role: 'appMenu' }
      ...(isMac ? [{
        label: app.name,
        submenu: [
          {role: 'about'},
          {type: 'separator'},
          {role: 'services'},
          {type: 'separator'},
          {role: 'hide'},
          {role: 'hideothers'},
          {role: 'unhide'},
          {type: 'separator'},
          {role: 'quit'}
        ]
      }] : []),
      // { role: 'fileMenu' }
      {
        label: 'Settings',
        submenu: [
          isMac ? {role: 'close'} : {role: 'quit'},
          {
            label: 'Open File',
            accelerator: 'CommandOrControl+O',
            click(item, focusedWindow) {
              mainProcess.getFileFromUser(focusedWindow);
            },
          },
          {
            label: 'Update User server password',
            accelerator: 'CommandOrControl+P',
            click(item, focusedWindow) {
              mainProcess.getPasword(focusedWindow);
            },
          },
        ]
      },
      // { role: 'viewMenu' }
      {
        label: 'View',
        submenu: [
          {role: 'reload'},
          {role: 'forcereload'},
          {role: 'toggledevtools'},
          {type: 'separator'},
          {role: 'resetzoom'},
          {role: 'zoomin'},
          {role: 'zoomout'},
          {type: 'separator'},
          {role: 'togglefullscreen'}
        ]
      },
      // { role: 'windowMenu' }
      {
        label: 'Window',
        submenu: [
          {role: 'minimize'},
          {role: 'zoom'},
          ...(isMac ? [
            {type: 'separator'},
            {role: 'front'},
            {type: 'separator'},
            {role: 'window'}
          ] : [
            {role: 'close'}
          ])
        ]
      },
      {
        role: 'help',
        submenu: [
          {
            label: 'Learn More',
            click: async () => {
              const {shell} = require('electron')
              await shell.openExternal('https://electronjs.org')
            }
          }
        ]
      }
    ]

};