const dateUI = document.getElementById("date");

let date = new Date();

let currentYearNumber = date.getFullYear();

dateUI.textContent = currentYearNumber.toString();