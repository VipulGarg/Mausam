import requests
import json
import sys


URL = 'http://api.openweathermap.org/data/2.5/forecast'
APP_KEY = 'APPID'
APP_KEY_VAL = 'f1b987fc0d1c523e536ee04ffc1b3cea'
CITY_KEY = 'q'

def getWeatherForLatitudeAndLongitude(city):
  r = requests.get(URL, params = {CITY_KEY: city, APP_KEY: APP_KEY_VAL})
  parseJson(city, r)

def parseJson(city, response):
  if (response.status_code == 200):
    dict = json.loads(response.text)
    print ("The weather in " + city + " is " +dict['list'][0]['weather'][0]['description'])
  else:
    response.raise_for_status()


if __name__ == "__main__":
  getWeatherForLatitudeAndLongitude(sys.argv[1])