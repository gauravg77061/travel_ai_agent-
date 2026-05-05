from src.agent.controller import detect_intent
from src.rag.rag_pipeline import run_rag
from src.llm.llm_client import get_answer
from  src.tools.weather_tool import get_weather

def handle_query(vector_store,query:str):
    
    intent=detect_intent(query)
    
    if(intent == 'travel'):
        return run_rag(vector_store,query)
    
    elif(intent == 'weather'):
        return get_weather("delhi")
    
    elif(intent == 'hotel'):
        return "Hotel recommendation cooming soon"
    else:
        return get_answer("",query)
    