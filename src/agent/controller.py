
def detect_intent(query:str):
    q=query.lower()
    
    if 'plan' in q or 'trip' in q or 'travel' in q:
        return "travel"
    
    elif 'weather' in q:
        return "weather"
    
    elif 'hotel' in q:
        return 'hotel'
    
    return 'general'