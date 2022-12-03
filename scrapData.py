from bs4 import BeautifulSoup
import requests


phase1 = 'https://resultados.as.com/resultados/futbol/mundial/2022/jornada/grupos_a_1/'
phase2 = 'https://resultados.as.com/resultados/futbol/mundial/2022/jornada/grupos_a_2/'
phase3 = 'https://resultados.as.com/resultados/futbol/mundial/2022/jornada/grupos_a_3/'


def returnSoup(website):
    page = requests.get(website)
    return BeautifulSoup(page.content, 'html.parser')


def getCountriesWorldCup(soupNeeded):
    countriesUnfiltered = soupNeeded.find_all('span', class_='nombre-equipo')
    countriesFiltered = []
    for country in countriesUnfiltered:
        countriesFiltered.append(country.text)
    return countriesFiltered


def getResults(resultsSoup):
    resultsUnfiltered = resultsSoup.find_all('a', class_='resultado')
    resultsFiltered = []
    resultsClean = []
    for res in resultsUnfiltered:
        resultsFiltered.append(res.text)

    for r in resultsFiltered:
        numbers = r.split()
        numbers.remove(numbers[1])
        if len(numbers) == 2:
            resultsClean.append(numbers)
    return resultsClean


def matchResultCells(result, countries, dtes):
    gamesList = []
    teams = 0
    gamesAndResults = []

    for games in range(len(result)):
        firstGame = []
        firstGame.append(countries[teams:(teams+2)])
        firstGame.append(result[games])
        gamesList.append(firstGame)
        teams = teams + 2

    counter = 0
    for game in gamesList:

        gamesAndResults.append(
            {game[0][0]: game[1][0], game[0][1]: game[1]
                [1], "date"+str(counter): dtes[counter]})
        counter = counter + 1
    return gamesAndResults


def getGamesDate(thesoup):
    dates = thesoup.find_all('span', class_='fecha')
    datesFiltered = []
    for date in dates:
        datesFiltered.append(str(date.text)[2:])
    return datesFiltered


def main(webadress):
    url = webadress

    soup = returnSoup(url)
    participants = getCountriesWorldCup(soup)
    gamesResults = getResults(soup)
    gamesDates = getGamesDate(soup)

    boards = matchResultCells(gamesResults, participants, gamesDates)
    return (boards)


# sopita = returnSoup(phase1)
# theFechas = getGamesDate(sopita)
# print(theFechas)

gms = main(phase1)
for g in gms:
    print(g)
