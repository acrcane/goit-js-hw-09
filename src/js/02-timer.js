import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


const collection = {
    htmlDays: document.querySelector('[data-days]'),
    htmlHours: document.querySelector('[data-hours]'),
    htmlMinutes: document.querySelector('[data-minutes]'),
    htmlSeconds: document.querySelector('[data-seconds]')
}
  
const startBtn = document.querySelector('[data-start]');
  
let countdownInterval; 
  
startBtn.addEventListener('click', startCountdown);
  
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        const selectedData = selectedDates[0].getTime();
    
        if (selectedData <= Date.now()) {
            alert("Please choose a date in the future")
            startBtn.setAttribute('disabled', '')
    
        } else {
            startBtn.removeAttribute('disabled')
        }
    },
};
  
flatpickr('#datetime-picker', options)
  
function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
}

function startCountdown() {
    // clearInterval(countdownInterval); 
    const countdownDate = new Date(document.querySelector('#datetime-picker').value).getTime();
    countdownInterval = setInterval(() => {
      const distance = countdownDate - Date.now();
      if (distance < 0) {
        clearInterval(countdownInterval);
        return;
    }

      const { days, hours, minutes, seconds } = convertMs(distance);
      collection.htmlDays.textContent = String(days).padStart(2, '0');
      collection.htmlHours.textContent = String(hours).padStart(2, '0');
      collection.htmlMinutes.textContent = String(minutes).padStart(2, '0');
      collection.htmlSeconds.textContent = String(seconds).padStart(2, '0');
    }, 0);
}
