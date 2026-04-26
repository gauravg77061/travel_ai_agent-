from  langchain_openai import OpenAIEmbeddings

def create_embedding_model():
    embedding_model=OpenAIEmbeddings(
        model="text-embedding-3-small"
    
    )
    
    return embedding_model


def generate_embedding(chunks):
    embedding_model=create_embedding_model()
    
    embeddings=embedding_model.embed_documents(chunks)
    
    return embeddings