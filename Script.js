
const button = document.getElementById('testButton');
const firstButton = document.getElementById('first-p-games')
const frame = document.getElementById("Fixture");

var resultDisplayed = 0;


firstButton.addEventListener('click', function(){
    fetch('http://192.168.1.224:5000/')           //api for the get request
    .then(response => response.json())
    .then(data => {
        if (resultDisplayed < 1){
            for (let block = 0; block < data.length; block ++){
                const box = document.createElement("div");

                let firstTeam = Object.keys(data[block])[0];
                let firstTeamGoals = Object.values(data[block])[0];
                let secondTeam = Object.keys(data[block])[1];
                let secondTeamGoals = Object.values(data[block])[1];
                let match = firstTeam + " " + firstTeamGoals + " - " + " " + secondTeamGoals + " " + secondTeam ;
                let matchDate = Object.values(data[block])[2];

                box.classList.add("div-few-style");
                box.innerText = match;
                box.innerText = box.innerText + "\n" + matchDate;
                box.style.color = "#1B2430";

                let flagLeft = document.createElement("img");
                flagLeft.src = "downloadImages/" + firstTeam + ".png";
                flagLeft.style.maxWidth = "50px";
                flagLeft.style.maxHeight = "45px";
                box.appendChild(flagLeft);
            
                
                let flagRight = document.createElement("img");
                flagRight.src = "downloadImages/" + secondTeam + ".png";
                flagRight.style.maxWidth = "50px";
                flagRight.style.maxHeight = "45px";
                box.appendChild(flagRight); 
                
                frame.appendChild(box);
                resultDisplayed++;
            }
        }
        
        }
    );
});