from src.llm.llm_client import get_answer
import json

def extract_city(query: str):

    prompt = f"""
Extract the city name from the user query.

Return only JSON in this format:

{{"city":"city_name"}}

if no city found:
{{"city":null}}


Query: {query}
"""

    response = get_answer("", prompt).strip()

    try:
        data=json.loads(response)
        return data.get("city")
    except:
        return None