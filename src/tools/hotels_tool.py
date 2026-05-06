def get_hotels(city:str):
    hotels=[
        {
            "name":"Taj resort",
            "rating":"4.7",
            "price":"8000rs/night"
        },
        {
            "name":"Radison blu",
            "rating":"4.7",
            "price":"6000rs/night"
        },
        {
            "name":"Budget In",
            "rating":"4.7",
            "price":"8000rs/night"
        }
    ]
    
    return{
        "city":city,
        "hotels":hotels
    }