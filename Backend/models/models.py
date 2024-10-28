from pydantic import BaseModel

class Credentials(BaseModel):
    email:str
    password:str

class NewUser(BaseModel):
    id : int
    fullname:str
    email:str 
    contactNo : str
    password:str 

class User(BaseModel):
    id : int
    fullname:str
    contactNo : str
    email:str   


class Vehicle(BaseModel):
    brand : str
    model : str
    year : str
    transmission : str
    odometer : int
    fuel : str
    type : str
    image : str
    price : str
    sellerId : int
    sold : bool

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
    
class Token(BaseModel):
    access_token: str
    token_type: str

class NewPassword(BaseModel):
    id : int
    currentPassword : str
    newPassword : str
    confirmPassword :str

class recommendation(BaseModel):
    model:str
    year:str


    
    
    
    
    
    
    
    