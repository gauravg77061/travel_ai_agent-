from src.agent.controller import detect_intent
from src.rag.rag_pipeline import run_rag
from src.llm.llm_client import get_answer
from  src.tools.weather_tool import get_weather
from src.tools.hotels_tool import get_hotels
from src.utils.extract_city import extract_city

def handle_query(vector_store,query:str):
    
    intent=detect_intent(query)
    
    if(intent == 'travel'):
        return run_rag(vector_store,query)
    
    elif(intent == 'weather'):
        city = extract_city(query)
        
        weather_data=get_weather(city)
        
        return get_answer(
            f"Weather data:{weather_data}",
            f"Explain weather for user query:{query}"
        )
    
    elif(intent == 'hotel'):
        return get_hotels("Goa")
    else:
        return get_answer("",query)
    