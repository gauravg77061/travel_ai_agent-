
def retrive_docs(vector_store,query):
    result=vector_store.similarity_search(query,k=2)
    return result