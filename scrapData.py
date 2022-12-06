from bs4 import BeautifulSoup
import requests
import json
from translate import Translator


phase1 = 'https://resultados.as.com/resultados/futbol/mundial/2022/jornada/grupos_a_1/'
phase2 = 'https://resultados.as.com/resultados/futbol/mundial/2022/jornada/grupos_a_2/'
phase3 = 'https://resultados.as.com/resultados/futbol/mundial/2022/jornada/grupos_a_3/'


# Due to slow process when scrapping + translating countries names, they are hardcoded in the script file
countriesEnglish = ['QATAR', 'ECUADOR', 'SENEGAL', 'NETHERLANDS', 'ENGLAND', 'IRAN', 'USA', 'WALES', 'ARGENTINA',
                    'SAUDI ARABIA', 'MEXICO', 'POLAND', 'DENMARK', 'TUNISIA', 'FRANCE', 'AUSTRALIA', 'GERMANY',
                    'JAPAN', 'SPAIN', 'COSTA RICA', 'MOROCCO', 'CROATIA', 'BELGIUM', 'CANADA', 'SWITZERLAND',
                    'CAMEROON', 'BRAZIL', 'SERBIA', 'URUGUAY', 'SOUTH KOREA', 'PORTUGAL', 'GHANA']


def returnSoup(website):
    page = requests.get(website)
    return BeautifulSoup(page.content, 'html.parser')


"""
def getCountriesWorldCup(soupNeeded):
    translator = Translator(from_lang="spanish", to_lang="english")
    countriesUnfiltered = soupNeeded.find_all('span', class_='nombre-equipo')
    countriesFiltered = []
    for country in countriesUnfiltered:
        countriesFiltered.append(translator.translate(country.text))
    return countriesFiltered
"""


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
    participants = countriesEnglish
    gamesResults = getResults(soup)
    gamesDates = getGamesDate(soup)

    boards = matchResultCells(gamesResults, participants, gamesDates)
    newBoards = json.dumps(boards)

    return (newBoards)
