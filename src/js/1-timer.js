import flatpickr from "flatpickr";
import iziToast from "izitoast";
import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";



const startBtn = document.querySelector("button[data-start]")
const dateInput = document.querySelector("input[type='text']#datetime-picker")
const timerElements = {
    days: document.querySelector("span[data-days]"),
    hours: document.querySelector("span[data-hours]"),
    minutes: document.querySelector("span[data-minutes]"),
    seconds: document.querySelector("span[data-seconds]"),
}
let userSelectedDate = ""

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0]
        console.log(userSelectedDate);

        if (Date.now() <= userSelectedDate) {
            startBtn.disabled = false
            startBtn.addEventListener("click", handleStartTimer)

        } else {
            iziToast.show({
                title: 'Error',
                message: 'Please choose a date in the future',
                titleColor: 'white',
                messageColor: 'white',
                backgroundColor: 'red',
                position: 'topRight'
            });
            startBtn.disabled = true
            startBtn.removeEventListener("click", handleStartTimer)
        }
    },
};


flatpickr("input[type='text']#datetime-picker", options)




function handleStartTimer(event) {
    event.target.disabled = true
    dateInput.disabled = true
    startBtn.removeEventListener("click", handleStartTimer)


    const intervalID = setInterval(() => {
        const diff = userSelectedDate - Date.now()
        const convertedDiff = convertMs(diff);

        if (Object.values(convertedDiff).every(value => value === -1)) {
            clearInterval(intervalID)
            startBtn.disabled = false
            dateInput.disabled = false
            startBtn.addEventListener("click", handleStartTimer)
            return;
        }

        Object.keys(timerElements).forEach(key => {
            timerElements[key].textContent = addLeadingZero(convertedDiff[key])
        })
    }, 1000)
}



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

function addLeadingZero(value) {
    return String(value).padStart(2, 0)
}