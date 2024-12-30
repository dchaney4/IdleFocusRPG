// Modules to control application life and create native browser window
const { ipcMain, app, BrowserWindow } = require('electron')
const path = require('node:path')

let mainWindow;
let secondaryWindow;
let windowPosition = {x: 0, y: 0 };

app.on('ready', () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 250,
    height: 300,
    x: windowPosition.x, 
    y: windowPosition.y,
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

  mainWindow.loadFile('index.html'); // Load the main window HTML

  // Open DevTools and set its size and position
  mainWindow.webContents.openDevTools({ mode: 'detach' });
  mainWindow.webContents.on('devtools-opened', () => {
      const devToolsWindow = BrowserWindow.getAllWindows().find(w => w.getTitle() === 'DevTools');
      if (devToolsWindow) {
          devToolsWindow.setBounds({ width: 400, height: 300, x: 100, y: 100 });
      }
  });

  mainWindow.on('close', () => {
    // Save the current position before the window closes
    windowPosition = mainWindow.getBounds();
  });
});

// Handle the button click from the renderer process
ipcMain.on('open-secondary-window', () => {
  // Hide the main window if needed
  console.log('IPC message received: open-secondary-window'); // Log when IPC message is received

  mainWindow.hide();
  const { x, y, width, height } = mainWindow.getBounds();
  
  // Calculate the center of the main window
  const centerX = x + width / 2;
  const centerY = y + height / 2;

  // Define the size of the secondary window
  const newWidth = 150;
  const newHeight = 200;

  // Calculate the top-left coordinates for the secondary window to be centered
  const newX = Math.round(centerX - newWidth / 2);
  const newY = Math.round(centerY - newHeight / 2);

  // Create the secondary window
  secondaryWindow = new BrowserWindow({
    width: newWidth,
    height: newHeight,
    x: newX,
    y: newY,
    resizable: false,
    frame: false,
    roundedCorners: true,
    webPreferences: {
      nodeIntegration: true, // Optional depending on your setup
      preload: path.join(__dirname + '/preload.js'),
    },
  });

  secondaryWindow.loadFile('secondary.html'); // Load the secondary window HTML
  secondaryWindow.on('close', () => {
    const { x, y, width, height } = secondaryWindow.getBounds();
    windowPosition = { x, y }; // Save the top-left corner position of the secondary window

    // Calculate the position to re-center the main window relative to the secondary window's position
    const mainWidth = 250;
    const mainHeight = 300;

    const newMainX = Math.round(x + (width / 2) - (mainWidth / 2));
    const newMainY = Math.round(y + (height / 2) - (mainHeight / 2));

    mainWindow.setBounds({
      x: newMainX,
      y: newMainY,
      width: mainWidth,
      height: mainHeight,
    });
  });
  

  // Handle when the secondary window is closed
  secondaryWindow.on('closed', () => {
    secondaryWindow = null;
    mainWindow.show(); // Show the main window again
  });
});

ipcMain.on('stop-button', () => {
  if (secondaryWindow) {
    secondaryWindow.close();
    secondaryWindow = null;
  }
});

ipcMain.on('minimize-window', () => {
  const focusedWindow = BrowserWindow.getFocusedWindow(); // Get the currently active window

  if (focusedWindow) {
    focusedWindow.minimize(); // Minimize the active window
  } else {
    console.error('No window is currently focused.');
  }
});

ipcMain.on('close-window', () => {
  const focusedWindow = BrowserWindow.getFocusedWindow(); // Get the currently active window

  if (focusedWindow) {
    focusedWindow.close(); // Minimize the active window
  } else {
    console.error('No window is currently focused.');
  }
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
