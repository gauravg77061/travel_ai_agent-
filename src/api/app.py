from fastapi import FastAPI
from pydantic import BaseModel

from src.ingestion.load_data import initialize_vector_store
from src.rag.rag_pipeline import run_rag
from src.agent.handler import handle_query

app=FastAPI()

#Load once 
vector_store=initialize_vector_store()

class QuerRequest(BaseModel):
    query:str
    
@app.get('/')
def home():
    return{"message" : "Travel AI runing"}


@app.post('/chat')
def chat(req:QuerRequest):
    answer=handle_query(vector_store,req.query)
    return {"response" : answer}
