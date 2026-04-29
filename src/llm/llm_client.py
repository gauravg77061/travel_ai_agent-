from dotenv import load_dotenv

load_dotenv()

from openai import OpenAI

client=OpenAI()

def get_answer(query,context):
    response=client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role":"system","content":"Answer the user with the contest given to you."},
            {"role":"user","content":f"Context:'n{context}\n\nQuestion:{query}"}
            
        ]
    )
    
    return response.choices[0].message.content


