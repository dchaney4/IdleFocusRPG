// Modules to control application life and create native browser window
const { ipcMain, app, BrowserWindow } = require('electron')
const path = require('node:path')

let mainWindow;
let secondaryWindow;

app.on('ready', () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 250,
    height: 300,
    resizable: false,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname + '/preload.js'), // Enable preload for IPC
      nodeIntegration: false,
      enableRemoteModule: false,
      contextIsolation: true,
    },
    autoHideMenuBar: true,
    
    
  });
  console.log('MainWindow:', mainWindow);
  mainWindow.loadFile('index.html'); // Load the main window HTML
});

// Handle the button click from the renderer process
ipcMain.on('open-secondary-window', () => {
  // Hide the main window if needed
  console.log('IPC message received: open-secondary-window'); // Log when IPC message is received

  mainWindow.hide();

  // Create the secondary window
  secondaryWindow = new BrowserWindow({
    width: 150,
    height: 200,
    resizable: false,
    frame: false,
    roundedCorners: true,
    webPreferences: {
      nodeIntegration: true, // Optional depending on your setup
    },
  });

  secondaryWindow.loadFile('secondary.html'); // Load the secondary window HTML

  
  

  // Handle when the secondary window is closed
  secondaryWindow.on('closed', () => {
    secondaryWindow = null;
    mainWindow.show(); // Show the main window again
  });
});

// Quit the app when all windows are closed
app.on('window-all-closed', () => {
  app.quit();
});


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
