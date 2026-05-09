import requests

def get_palce_info(place:str):
    
    url=f"https://en.wikipedia.org/api/rest_v1/page/summary/{place}"
    
    response=requests.get(url)
    
    data=response.json()
    
    return{
        "tittle":data.get("tittle"),
        "description":data.get("description"),
        "summary":data.get("extract")
    }