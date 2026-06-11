import requests

API_KEY = "f303a72f13827cf69ac6b9a04999f7da"

def get_weather(city):

    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"

    r = requests.get(url)

    data = r.json()

    weather = {
        "temperature": data["main"]["temp"],
        "humidity": data["main"]["humidity"],
        "wind": data["wind"]["speed"],
        "rain": data.get("rain", {}).get("1h", 0)
    }

    return weather