from src.agent.controller import detect_intent
from src.rag.rag_pipeline import run_rag
from src.llm.llm_client import get_answer
from  src.tools.weather_tool import get_weather
from src.tools.place_tool import get_palce_info
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
    
    
    elif(intent == 'place_info'):
        city=extract_city(query)
        
        if not city:
            return "Please mention a city for hotel recommendation"
        
        place_data=get_palce_info(city)
        
       
        
        return get_answer(
            f"City data: {place_data}",
            f"Explain this place in a friendly travel style:{query}"
        )
        
    else:
        return get_answer("",query)
    