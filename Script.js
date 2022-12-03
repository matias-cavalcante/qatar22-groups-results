
const button = document.getElementById('testButton');

button.addEventListener('click', function(){
    fetch('http://192.168.1.224:5000/')           //api for the get request
    .then(response => response.json())
    .then(data => console.log(data));
});