from bs4 import BeautifulSoup
import requests


url = requests.get(
    'https://www.espn.com/soccer/fifa-world-cup/story/4788684/2022-world-cup-all-squad-lists-for-qatar')
soup = BeautifulSoup(url.content, 'html.parser')

flags = soup.find_all("img", class_="floatleft")

print(flags)
