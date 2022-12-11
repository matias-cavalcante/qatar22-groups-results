
const button = document.getElementById('testButton');
const firstButton = document.getElementById('first-p-games')
const frame = document.getElementById("Fixture");

const phaseOneTitle = document.createElement("h1");
phaseOneTitle.innerText = "PHASE 1 WORLD CUP QATAR 2022";

const phaseContainer = document.createElement("div");
phaseContainer.appendChild(phaseOneTitle);
phaseContainer.classList.add("div-matches-phases");
//This will have to be changed so that it displays the different groups names

var resultDisplayed = 0;


firstButton.addEventListener('click', function(){
    fetch('https://matiass37.pythonanywhere.com/',
        {
            method: "GET",
            mode: "no-cors",
            headers: {
              "Content-Type": "text/plain",
            }
    })
    .then(response => response)
    .then(data => {
        frame.appendChild(phaseContainer);
        console.log(data);
        if (resultDisplayed < 1){
            for (let block = 0; block < data.length; block ++){
                const box = document.createElement("div");

                let firstTeam = Object.keys(data[block])[0];
                let firstTeamGoals = Object.values(data[block])[0];
                let secondTeam = Object.keys(data[block])[1];
                let secondTeamGoals = Object.values(data[block])[1];
                let match = firstTeam + " " + firstTeamGoals + " - " + " " + secondTeamGoals + " " + secondTeam ;
                let matchDate = Object.values(data[block])[2];

                const conOne = document.createElement("div");
                const conTwo = document.createElement("div");
                conTwo.style.width = "325px";
                const conThree = document.createElement("div");

                conOne.classList.add('div-flags-and-matches');
                conTwo.classList.add('div-flags-and-matches');
                conThree.classList.add('div-flags-and-matches');

                let flagLeft = document.createElement("img");
                flagLeft.src = "downloadImages/" + firstTeam + ".png";
                flagLeft.style.maxWidth = "50px";
                flagLeft.style.maxHeight = "45px";
                conOne.appendChild(flagLeft);

                let flagRight = document.createElement("img");
                flagRight.src = "downloadImages/" + secondTeam + ".png";
                flagRight.style.maxWidth = "50px";
                flagRight.style.maxHeight = "45px";
                conThree.appendChild(flagRight); 

                conTwo.innerText = match;
                conTwo.innerText = conTwo.innerText + "\n" + matchDate;
                conTwo.style.color = "#1B2430";



                box.appendChild(conOne);
                box.appendChild(conTwo);
                box.appendChild(conThree);

                box.classList.add("div-few-style");
                
                
            

               
            
             
                
                
                frame.appendChild(box);
                resultDisplayed++;
              
            }
        }
        
        });
});