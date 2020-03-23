const weatherForm = document.querySelector("form");
const searchAddress = document.querySelector("input");
const message = document.getElementById("tempValue");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const location = searchAddress.value;
  fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
    response.json().then(data => {
      console.log(data.forecast);
      message.innerHTML = data.forecast;
    });
  });
});
