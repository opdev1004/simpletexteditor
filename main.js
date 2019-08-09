const { app, BrowserWindow, ipcMain, session, Menu, dialog } = require('electron')
const path = require('path');
const url = require('url');
const fs = require('fs');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
      icon: __dirname + '/build/favicon.ico',
      width: 960,
      height: 600,
      minHeight: 400,
      minWidth: 640,
      frame: true,
      webPreferences: {
        contextIsolation: true,
        nodeIntegration: false,
        preload: path.resolve(__dirname, 'preload.js')
      }
    });

    // and load the index.html of the app.
    const startUrl = process.env.ELECTRON_START_URL || url.format({
                pathname: path.join(__dirname, '/simpletexteditor-react/build/index.html'),
                protocol: 'file:',
                slashes: true
            });
        mainWindow.loadURL(startUrl);

    // Open the DevTools.
    //mainWindow.webContents.openDevTools();
    // set menu to null
    //mainWindow.setMenu(null);

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert Menu
    Menu.setApplicationMenu(mainMenu);

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('save', (event, arg) => {
  var options = {
    filters: [
        { name: 'Texts', extensions: ['txt', 'html', 'css', 'js', 'php', 'java', 'cpp', 'c', 'h', 'py'] },
        { name: 'Custom File Type', extensions: ['as'] },
        { name: 'All Files', extensions: ['*'] }
    ]
  };

  dialog.showSaveDialog(options,
    (filename) => {
      if (filename === undefined) {
        return;
      }
      // fileName is a string that contains the path and filename created in the save file dialog.
      fs.writeFile(filename, arg, (err) => {
        if(err){
          console.log("An error ocurred creating the file: "+ err.message)
          return;
        }
        console.log("The file has been succesfully saved");
      });
    }
  );
});

const mainMenuTemplate = [
  {
    label: "File",
    submenu:[
      {
        label: "Save",
        accelerator: "CmdOrCtrl+S",
        click(){
          mainWindow.webContents.send("save");
        } // End of Click
      },
      {
        label: "Load",
        accelerator: "CmdOrCtrl+L",
        click(){

          var options = {
            properties: ['openFile', 'multiSelections'],
            filters: [
                { name: 'Texts', extensions: ['txt', 'html', 'css', 'js', 'php', 'java', 'cpp', 'c', 'h', 'py'] },
                { name: 'Custom File Type', extensions: ['as'] },
                { name: 'All Files', extensions: ['*'] }
            ]
          };

          dialog.showOpenDialog(options,
            (filename) => {
              if (filename === undefined) {
                return;
              }
              fs.readFile(filename[0], 'utf8', (err, data) => {
                if(err){
                  console.log(err);
                  return;
                }
                mainWindow.webContents.send("load", data);
              });
            }
          ); // End of dialog

        } // End of Click
      },
      {
        role: 'quit',
        accelerator: "CmdOrCtrl+Q"
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'selectAll' },
      { type: 'separator' }
    ]
  },
  {
    label: 'Settings',
    submenu: [
      { label: 'preference' }
    ]
  }
];
