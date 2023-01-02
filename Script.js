import {createFlagAndCountryBox} from './scriptModules/smallBoxes';

const firstButton = document.getElementById('first-p-games')
const secondButton = document.getElementById('second-p-games')
const thirdButton = document.getElementById('third-p-games')

const frame = document.getElementById("Fixture");

const resultGroupSixteen = document.getElementById('results-16')
const resultGroupSixtenBox = document.getElementById('group-16-section-container')

const scrollUpButton = document.getElementById('go-top');


scrollUpButton.addEventListener('click', function(){
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
})

function createMatchBoxes(){
    const styledBox = document.createElement("div");
    styledBox.classList.add("div-few-style");
    return styledBox
}

function createFixtureH2(text){
    const h2Text = document.createElement("h2");
    h2Text.innerText = text;  
    h2Text.style.fontWeight = "500";
    return h2Text
}

function fixtureH2container(h2element, styles){
    const phaseContainer = document.createElement("div");
    phaseContainer.appendChild(h2element);
    phaseContainer.classList.add(styles);
    return phaseContainer;
}

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
    row.classList.add('div-flags-and-matches');
    return row
}

function createDateRow(date){
    const dateRow = document.createElement('p');
    dateRow.classList.add('div-flags-and-matches');
    dateRow.innerHTML = date;
    dateRow.style.color = "grey";
    return dateRow
}

function countryNameElement(name){
    let country = document.createElement('p');
    country.innerHTML = name;
    return country
}

function getCountryFlag(country){
    let flagLeft = document.createElement("img");
    flagLeft.src = "Images/smallFlags/" + country + ".png";
    flagLeft.style.maxWidth = "50px";
    flagLeft.style.maxHeight = "45px";
    flagLeft.style.paddingRight = "10px";
    return flagLeft;
}
/*
function flagAndCountryBox(){
    let flagAndCountry = document.createElement('div');
    flagAndCountry.style.display = "flex";
    return flagAndCountry
}*/

function teamGoalsBuilder(amount){
    let teamGoals = document.createElement('p');
    teamGoals.innerHTML = amount;
    teamGoals.style.position = "relative";
    teamGoals.style.right = "10px";
    return teamGoals
}

function countryContainerCreator(countryName){
    let boxFlagCountry = createFlagAndCountryBox();
    let countryFlag = getCountryFlag(countryName)
    let countryNameStyled = countryNameElement(countryName)
    boxFlagCountry.append(countryFlag, countryNameStyled);
    return boxFlagCountry
}
  
//This will have to be changed so that it displays the different groups names

function mainMatches(url, titleContainer, frameContainer){
    fetch(url)
    .then(response => response.json())
    .then(data => {
        frameContainer.appendChild(titleContainer);
            for (let block = 0; block < data.length; block ++){
                const box = createMatchBoxes();
                let matchInfo = getMatchInfo(data, block);

                const countryOneRow = createResultRow();
                const countryTwoRow = createResultRow();
                const matchDateRow =  createDateRow(matchInfo[4]);

                let boxFlagCountryOne = countryContainerCreator(matchInfo[0])
                let countryOneGoals = teamGoalsBuilder(matchInfo[1]);
                countryOneRow.append(boxFlagCountryOne, countryOneGoals);

                let boxFlagCountryTwo = countryContainerCreator(matchInfo[2])
                let country2Goals = teamGoalsBuilder(matchInfo[3]);
                countryTwoRow.append(boxFlagCountryTwo, country2Goals);

                box.append(countryOneRow, countryTwoRow, matchDateRow);

                frameContainer.appendChild(box);
                frameContainer.scrollIntoView();
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
    const title = createFixtureH2('Groups phase one');
    const container = fixtureH2container(title, "div-matches-phases");
    mainMatches('https://matiass37.pythonanywhere.com/one', container, frame);    
})
    
secondButton.addEventListener('click', function(){
    clearFrame();
    const title = createFixtureH2('Groups phase two');
    const container = fixtureH2container(title, "div-matches-phases");
    mainMatches('https://matiass37.pythonanywhere.com/two', container, frame);
})
    
thirdButton.addEventListener('click', function(){
    clearFrame();
    const title = createFixtureH2('Groups phase three');
    const container = fixtureH2container(title, "div-matches-phases");
    mainMatches('https://matiass37.pythonanywhere.com/three', container, frame);
})

resultGroupSixteen.addEventListener('click', function(){
    const title = createFixtureH2('Group of sixteen');
    const container = fixtureH2container(title, "div-matches-phases")
    mainMatches('https://matiass37.pythonanywhere.com/sixteen', container, resultGroupSixtenBox);
})