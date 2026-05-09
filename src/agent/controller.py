
def detect_intent(query:str):
    q=query.lower()
    
    if 'plan' in q or 'trip' in q or 'travel' in q:
        return "travel"
    
    elif 'weather' in q:
        return "weather"
    
    elif 'place' in q or "about" in q or "visit" in g:
        return 'place_info'
    
    return 'general'