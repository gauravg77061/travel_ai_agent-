import requests

API_KEY="c7aea9a6bfb2ae072a3eb6d07d647e79"

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