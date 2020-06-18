const isMac = process.platform === 'darwin'

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
        label: 'File',
        submenu: [
          isMac ? {role: 'close'} : {role: 'quit'}
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