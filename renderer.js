/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
// Add an event listener to the button
// Wait until the DOM is fully loaded
window.addEventListener('load', () => {
  // Try to find the button
  const openSecondaryButton = document.getElementById('start-button');
  
  // Add additional debugging
  console.log('Document loaded');
  console.log('Button search result:', openSecondaryButton);

  // Check if button exists before adding event listener
  if (openSecondaryButton) {
      openSecondaryButton.addEventListener('click', () => {
          console.log('Start button clicked!');
          window.electronAPI.openSecondaryWindow();
      });
  } else {
      console.error('Start button not found in the document');
  }
});
