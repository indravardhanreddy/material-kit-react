// Input date in YYYY-MM-DD format
// Create a JavaScript Date object from the input date

export function formatDate (inputDate){
const date = new Date(inputDate);

// Days of the week in an array
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Months in an array
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Get the day of the week, month, and year
const dayOfWeek = daysOfWeek[date.getDay()];
const month = months[date.getMonth()];
const year = date.getFullYear();

// Get the date, hours, minutes, and seconds
const day = date.getDate();
const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();

// Get the time zone offset (in minutes) and convert it to hours and minutes
const timeZoneOffsetMinutes = date.getTimezoneOffset();
// const timeZoneOffsetHours = Math.abs(Math.floor(timeZoneOffsetMinutes / 60));
const timeZoneOffsetMinutesRemainder = Math.abs(timeZoneOffsetMinutes % 60);

// Determine the time zone sign (e.g., GMT+0530 or GMT-0530)
const timeZoneSign = timeZoneOffsetMinutes > 0 ? '-' : '+';

// Format the date string
// const formattedDate = `${dayOfWeek} ${month} ${day} ${year} ${hours}:${minutes}:${seconds} GMT${timeZoneSign}${(0${timeZoneOffsetHours}).slice(-2)}${(0${timeZoneOffsetMinutesRemainder}).slice(-2)} (India Standard Time)`;


}

export function formatDateAdded (inputDate){
    // Input date string
const dateString = inputDate;

// Create a JavaScript Date object from the input date string
const date = new Date(dateString);
console.log(date)

// Extract the year, month, and day from the Date object
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1 and pad with '0' if necessary
const day = String(date.getDate()).padStart(2, '0'); // Pad with '0' if necessary

// Create the formatted date string
const formattedDate = `${year}-${month}-${day}`;

return formattedDate
}