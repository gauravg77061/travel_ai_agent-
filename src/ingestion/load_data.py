
def load_text(file_path):
    with open(file_path,"r",encoding="utf-8") as f:
        return f.read()
    
if __name__ =="__main__":
    data=load_text("data/travel_data.txt")
    print(data)
    