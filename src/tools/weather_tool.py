import requests
from dotenv import load_dotenv
import os
load_dotenv()

API_KEY=os.getenv("WEATHER_API_KEY")



def get_weather(city:str):
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    
    resposne=requests.get(url).json()
    
    if resposne.get("main"):
        temp=resposne["main"]["temp"]
        desc=resposne["weather"][0]["description"]
        
        return{
            "city":city,
            "temperature":temp,
            "description":desc
        }  
        
    return {"error":"City not found"}   