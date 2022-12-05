
const button = document.getElementById('testButton');
const frame = document.getElementById("Fixture");


button.addEventListener('click', function(){
    fetch('http://192.168.1.224:5000/')           //api for the get request
    .then(response => response.json())
    .then(data => {
            //console.log(Object.keys(data[0])[1]);

            //console.log( Object.values(data[0])[0] );
        for (let block = 0; block < data.length; block ++){
            const box = document.createElement("div");
            let firstTeam = Object.keys(data[block])[0];
            let firstTeamGoals = Object.values(data[block])[0];
            let secondTeam = Object.keys(data[block])[1];
            let secondTeamGoals = Object.values(data[block])[1];
            let match = firstTeam + " " + firstTeamGoals + " - " + secondTeam + " " + secondTeamGoals;
            let matchDate = Object.values(data[block])[2]

            box.classList.add("div-few-style");
            //box.innerText = Object.keys(data[block])[1];
            box.innerText = match;
            box.innerText = box.innerText + "\n" + matchDate;
            box.style.color = "white";
            frame.appendChild(box);
        }
        }
    );
});