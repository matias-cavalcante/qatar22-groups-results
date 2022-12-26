const firstButton = document.getElementById('first-p-games')
const secondButton = document.getElementById('second-p-games')
const thirdButton = document.getElementById('third-p-games')


const frame = document.getElementById("Fixture");

const phaseOneTitle = document.createElement("h2");
phaseOneTitle.innerText = "Groups phase one ";
phaseOneTitle.style.fontWeight = "500";

const phaseContainer = document.createElement("div");

phaseOneTitle.classList.add('div-bottom-sign');
phaseContainer.appendChild(phaseOneTitle);
phaseContainer.classList.add("div-matches-phases");

function getMatchInfo(source, position){
    let firstTeam = Object.keys(source[position])[0];
    let firstTgoals = Object.values(source[position])[0];

    let secondTeam = Object.keys(source[position])[1];
    let secondTgoals = Object.values(source[position])[1];

    let matchDate = Object.values(source[position])[2];

    return [firstTeam, firstTgoals, secondTeam, secondTgoals, matchDate]
}

function createResultRow(){
    const row = document.createElement('p');
    return row
}

function getCountryFlag(country){
    let flagLeft = document.createElement("img");
    flagLeft.src = "downloadImages/" + country + ".png";
    flagLeft.style.maxWidth = "50px";
    flagLeft.style.maxHeight = "45px";
    flagLeft.style.paddingRight = "10px";
    return flagLeft;
}

function flagAndCountryBox(){
    let flagAndCountry = document.createElement('div');
    flagAndCountry.style.display = "flex";
    return flagAndCountry
}
  
//This will have to be changed so that it displays the different groups names

function mainMatches(url){
    fetch(url)
    .then(response => response.json())
    .then(data => {
        frame.appendChild(phaseContainer);
            for (let block = 0; block < data.length; block ++){
                const box = document.createElement("div");

                let matchInfo = getMatchInfo(data, block);


                const countryOneRow = createResultRow();
                countryOneRow.classList.add('div-flags-and-matches');
                const countryTwoRow = createResultRow();
                countryTwoRow.classList.add('div-flags-and-matches');

                const matchDateRow =   createResultRow();
                matchDateRow.classList.add('div-flags-and-matches');


                let firstCountryFlag = getCountryFlag(matchInfo[0])
                let countrie1test = document.createElement('p');
                countrie1test.innerHTML = matchInfo[0];
                
                let boxFlagCountryOne = flagAndCountryBox();
                boxFlagCountryOne.appendChild(firstCountryFlag);
                boxFlagCountryOne.append(countrie1test);

                let country1Goals = document.createElement('p');
                country1Goals.innerHTML = matchInfo[1];
                country1Goals.style.position = "relative";
                country1Goals.style.right = "10px";

                countryOneRow.appendChild(boxFlagCountryOne);                
                countryOneRow.appendChild(country1Goals);

                
                let secCountryFlag = getCountryFlag(matchInfo[2])
                let countrie2test = document.createElement('p');
                countrie2test.innerHTML = matchInfo[2];

                let boxFlagCountryTwo = flagAndCountryBox();
                boxFlagCountryTwo.appendChild(secCountryFlag);
                boxFlagCountryTwo.append(countrie2test);
                
                let country2Goals = document.createElement('p');
                country2Goals.innerHTML = matchInfo[3];
                country2Goals.style.position = "relative";
                country2Goals.style.right = "10px";

                countryTwoRow.appendChild(boxFlagCountryTwo);
                countryTwoRow.appendChild(country2Goals);

                matchDateRow.innerHTML = matchInfo[4];
                matchDateRow.style.color = "grey";

                box.appendChild(countryOneRow);
                box.appendChild(countryTwoRow);
                box.appendChild(matchDateRow);

                box.classList.add("div-few-style");
                frame.appendChild(box);
                frame.scrollIntoView();

                console.log("We are here")

            }

        });
}


function clearFrame() {
    while (frame.firstChild) {
      frame.removeChild(frame.firstChild);
    }
  }


firstButton.addEventListener('click', function(){
    clearFrame();
    mainMatches('https://matiass37.pythonanywhere.com/one');    
})
    
secondButton.addEventListener('click', function(){
    clearFrame();
    mainMatches('https://matiass37.pythonanywhere.com/two');
})
    
thirdButton.addEventListener('click', function(){
    clearFrame();
    mainMatches('https://matiass37.pythonanywhere.com/three');
})





