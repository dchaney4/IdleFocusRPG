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
    const stopButton = document.getElementById('stop-button'); // Stop button reference
    const timer = document.getElementById('timer'); // Timer display reference

    let timerInterval;
    let elapsedTime = 0;

  // Add additional debugging
    console.log('Document loaded');
    console.log('Button search result:', openSecondaryButton);

  // Check if button exists before adding event listener
    if (openSecondaryButton) {
      openSecondaryButton.addEventListener('click', () => {
          console.log('Start button clicked!');
          window.electronAPI.openSecondaryWindow();
          startTimer();
      });
    } 
    else {
      console.error('Start button not found in the document');
    } 

    if (stopButton) {
        stopButton.addEventListener('click', () => {
            console.log('Stop button clicked!');
            stopTimer();
            window.electronAPI.stopTimer();
        });
    } 
    else {
        console.error('Stop button not found in the document');
    }

    const titleBar = document.getElementById('title-bar');

    titleBar.addEventListener('click', (event) => {
    if (!event.target.classList.contains('title-button')) return; // Ignore clicks outside buttons
    
    switch (event.target.id) {
        case 'minimize-button':
        console.log('Minimize button clicked');
        window.electronAPI.minimizeWindow();
        break;

        case 'close-button':
        console.log('Close button clicked');
        window.electronAPI.closeWindow();
        break;
    }
    });

    function startTimer() {
        // Check if a timer is already running
        timerInterval = setInterval(() => {
        elapsedTime++;
        timerDisplay.textContent = `${elapsedTime}`; // Update the display
        }, 1000); // Run every second
    }

    function stopTimer() {
        clearInterval(timerInterval); // Stop the interval
        timerInterval = null; // Clear the stored interval ID
        elapsedTime = 0; // Reset the time
        timer.textContent = '0'; // Reset display
    }
});