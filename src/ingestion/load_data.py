from langchain_text_splitters import RecursiveCharacterTextSplitter
from src.embeddings.embedder import create_embedding_model
from src.vectorstore.vectordb import create_vector_store
from src.rag.rag_pipeline import run_rag

from dotenv import load_dotenv

load_dotenv()


def load_text(file_path):
    with open(file_path,"r",encoding="utf-8") as f:
        return f.read()
    
def split_textIntoChunks(text):
    
    #splits the text 
    
    splitter=RecursiveCharacterTextSplitter(
        chunk_size=100,
        chunk_overlap=20
    )
    
    #chunking
    
    chunks=splitter.split_text(text)
    
    #return chunking 
    return chunks

def initialize_vector_store():
    data=load_text("data/travel_data.txt")
    
    chunks=split_textIntoChunks(data)
    
    embeddings_model=create_embedding_model()
    
    vector_store=create_vector_store(chunks,embeddings_model)
    
    print("Vector db created successfully")
    
    return vector_store

# This is for cli
    
# if __name__ =="__main__":
    
    print("")
    # data=load_text("data/travel_data.txt")
    # # print(data)
    
    # chunks=split_textIntoChunks(data)
    
    # # print(f"Total chunks :{len(chunks)}\n")
    
    # embeddings_model=create_embedding_model()
    
    # vector_store=create_vector_store(chunks,embeddings_model)
    
    # print("vector db created successfully")
    
    # while True:
    #     query =input("Ask (type exit):")
        
    #     if query.lower() == "exit":
    #         break
    #     answer=run_rag(vector_store,query)
        
    #     print("\nResults",answer)
    #     print("-"*50)
    
    #sample query for testing whether we are able to retrive data from the vector db or not :
    
    # query="Tell me about the Goa"
    
    # results=retrive_docs(vector_store,query)
    
    # print("Retrived Resuts:\n")
    
    # for doc in results:
    #     print(doc.page_content)
    #     print("-"*40)
    
    # print(f"Embeddings generated :{len(embeddings)}")
    
    # for i, chunk in enumerate(chunks):
    #     print(f"Chunk{i+1}:")
    #     print(chunk)
    

    