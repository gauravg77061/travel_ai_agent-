import requests
from urllib.parse import quote


def get_place_info(place: str):

    encoded_place = quote(str(place).strip())

    url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{encoded_place}"

    headers = {
        "User-Agent": "travel-ai-agent/1.0"
    }

    response = requests.get(
        url,
        headers=headers
    )

    # print("STATUS:", response.status_code)
    # print("TEXT:", response.text)

    # 🔥 important safety check
    if response.status_code != 200:

        return {
            "error": f"API failed with status {response.status_code}"
        }

    try:

        data = response.json()

        return {
            "title": data.get("title"),
            "description": data.get("description"),
            "summary": data.get("extract")
        }

    except Exception as e:

        return {
            "error": str(e),
            "raw_response": response.text
        }