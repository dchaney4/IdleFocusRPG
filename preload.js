/**
 * The preload script runs before `index.html` is loaded
 * in the renderer. It has access to web APIs as well as
 * Electron's renderer process modules and some polyfilled
 * Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openSecondaryWindow: () => {
    console.log('openSecondaryWindow called in preload');
    ipcRenderer.send('open-secondary-window');
  },
  minimizeWindow: () => {
    console.log('minimizeWindow called in preload');
    ipcRenderer.send('minimize-window');
  },
  closeWindow: () => {
    console.log('closeWindow called in preload');
    ipcRenderer.send('close-window');
  },
  stopButton: () => {
    console.log('Stop timer triggered in preload');
    ipcRenderer.send('stop-button'); // Send message to stop the timer
  },
  onTimerUpdate: (callback) => {
    ipcRenderer.on('update-timer', (_, value) => callback(value));
    },
});
