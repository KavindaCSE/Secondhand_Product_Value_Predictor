from pydantic import BaseModel

class Credentials(BaseModel):
    email:str
    password:str

class NewUser(BaseModel):
    id : int
    fullname:str
    email:str 
    password:str 

class User(BaseModel):
    id : int
    fullname:str
    email:str   


class Vehicle(BaseModel):
    year:str
    manufacturer:str
    model:str
    condition:str
    fuel:str
    odometer: int
    title_status:str
    transmission:str
    type:str
    age: int
    userid:int
    price:str

class Prediction(BaseModel):
    year: int
    manufacturer:int
    model:int
    condition:int
    fuel:int 
    odometer: int
    title_status:int 
    transmission:int 
    type:int 
    age:int
    
class Token(BaseModel):
    access_token: str
    token_type: str


    
    
    
    
    
    
    
    