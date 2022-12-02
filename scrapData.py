from bs4 import BeautifulSoup
import requests
import pandas as pnd

url = 'https://resultados.as.com/resultados/futbol/mundial/jornada/'
page = requests.get(url)


soup = BeautifulSoup(page.content, 'html.parser')

# From here to line 18 we get all of the participant teams names
countriesRaw = soup.find_all('span',
                             class_='nombre-equipo')

countriesClean = []

for country in countriesRaw:
    countriesClean.append(country.text)

# From here to line 32 we get all results of phase 2
resultsRaw = soup.find_all('a', class_='resultado')
resultsFiltered = []
resultsClean = []

for res in resultsRaw:
    resultsFiltered.append(res.text)

for r in resultsFiltered:
    numbers = r.split()
    numbers.remove(numbers[1])
    if len(numbers) == 2:
        resultsClean.append(numbers)

# Provisory list

gamesList = []
teams = 0

for games in range(len(resultsClean)):
    firstGame = []
    firstGame.append(countriesClean[teams:(teams+2)])
    firstGame.append(resultsClean[games])
    gamesList.append(firstGame)
    teams = teams + 2


for game in gamesList:
    print(game[0][0], " : ", game[1][0], " - ", game[0][1], " : ", game[1][1])
