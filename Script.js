
const button = document.getElementById('testButton');
const frame = document.getElementById("Fixture");


button.addEventListener('click', function(){
    fetch('http://192.168.1.224:5000/')           //api for the get request
    .then(response => response.json())
    .then(data => {
        const box = document.createElement("div");
        box.classList.add("div-few-style");
        document.body.appendChild(box);
        }
    );

    

});