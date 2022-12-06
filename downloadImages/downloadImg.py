from io import BytesIO

from PIL import Image
import requests


def downloadImage(url, fileName):
    req = requests.get(url)
    img = Image.open(BytesIO(req.content))
    img.save(fileName)


if __name__ == "__main__":
    imgURL = "https://library.sportingnews.com/styles/crop_style_16_9_mobile_2x/s3/2022-11/nba-plain--732cb834-f8d0-4014-92f5-27adb6e84946.png?itok=elXFf_YH"
    theFile = "test.png"
    downloadImage(imgURL, theFile)
