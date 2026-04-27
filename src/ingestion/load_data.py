from langchain_text_splitters import RecursiveCharacterTextSplitter
from src.embeddings.embedder import create_embedding_model
from src.vectorstore.vectordb import create_vector_store

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
    
if __name__ =="__main__":
    data=load_text("data/travel_data.txt")
    print(data)
    
    chunks=split_textIntoChunks(data)
    
    print(f"Total chunks :{len(chunks)}\n")
    
    embeddings_model=create_embedding_model()
    
    vector_store=create_vector_store(chunks,embeddings_model)
    
    print("vector db created successfully")
    
    # print(f"Embeddings generated :{len(embeddings)}")
    
    # for i, chunk in enumerate(chunks):
    #     print(f"Chunk{i+1}:")
    #     print(chunk)
    

    