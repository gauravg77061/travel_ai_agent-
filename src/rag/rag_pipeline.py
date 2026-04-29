from src.llm.llm_client import get_answer

def run_rag(vector_store,query):
    result=vector_store.similarity_search(query,k=2)
    
    context=""
    
    for doc in result:
        context+=doc.page_content + "\n\n"
        
    answer=get_answer(context,query)
    
    return answer

    