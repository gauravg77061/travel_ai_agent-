from src.llm.llm_client import get_answer
import json


def extract_city(query: str):

    prompt = f"""
Extract ONLY the city/place name from the query.

Return JSON only.

Example:
{{"city":"Delhi"}}

Query:
{query}
"""

    response = get_answer("", prompt)

    try:

        data = json.loads(response)

        return data.get("city")

    except:

        return None