/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

let timer = 0;
let timerInterval;
const button = document.getElementById('start-button');

document.getElementById('start-button').addEventListener('click', () => {
    // Check if the timer is already running
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        button.textContext = "Start"
    } 
    else{
  
    // Start the timer
        timerInterval = setInterval(() => {
        timer++;
        document.getElementById('timer').textContent = timer;
        }, 1000);
        button.textContext = "Stop";
    }
  });