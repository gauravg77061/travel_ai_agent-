from langchain_text_splitters import RecursiveCharacterTextSplitter


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
    
    for i, chunk in enumerate(chunks):
        print(f"Chunk{i+1}:")
        print(chunk)
    

    