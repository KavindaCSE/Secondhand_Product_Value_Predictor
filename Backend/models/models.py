from pydantic import BaseModel

class User(BaseModel):
    id : int
    firstname:str
    lastname:str
    email:str   

'year', 'manufacturer', 'model', 'condition', 'fuel', 'title_status', 'transmission', 'type'

class Vehicle(BaseModel):
    year:int
    manufacturer:int
    model:int
    condition:int
    fuel:int
    odometer: int
    title_status:int
    transmission:int
    type:int
    age: int
    userid:int
    price:float

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
    
    
    
    
    
    
    
    
    