from fastapi import FastAPI
from jwt_auth.jwt import create_access_token
from config.config import database
from models.models import User,Vehicle,Prediction,NewUser,Credentials,Token,NewPassword
from fastapi.middleware.cors import CORSMiddleware 
import pickle
from passlib.context import CryptContext
import pandas as pd
import numpy as np

with open('./Prediction/xgb_model.pkl','rb') as f:
    model = pickle.load(f)


app = FastAPI()

origins = [
    'http://localhost:3000'
]

#add midldleware
app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

pwd_cxt = CryptContext(schemes=["bcrypt"],deprecated="auto")

@app.post('/add-user',tags=["user"])
async def add_user(user: NewUser):
    hashed_pw = pwd_cxt.hash(user.password)
    user = user.dict()
    user["password"] = hashed_pw
    result = database["users"].insert_one(user)
    return "success"

@app.post('/login', tags=["user"])
async def login(request: Credentials):
    user = database["users"].find_one({"email": request.email})

    if user is None:
        return "User not found"

    if not pwd_cxt.verify(request.password, user["password"]):
        return "Invalid password"

    access_token = create_access_token(data={"sub": user["id"]})
    return Token(access_token=access_token, token_type="bearer")


@app.put('/change-password',tags=["user"])
async def changePassword(request:NewPassword):
    user = database["users"].find_one({"id":request.id})

    if not pwd_cxt.verify(request.currentPassword, user["password"]):
        return "Invalid Current password"

    if (request.confirmPassword != request.newPassword):
        return "New Password Invalid"

    updatePW = {"password" : pwd_cxt.hash(request.confirmPassword) }
    database["users"].update_one({"id": request.id}, {"$set": updatePW})
    return "Password Changed!"    
    

@app.get('/get_user/{id}', tags=["user"])
async def get_user(id: int):
    user = database["users"].find_one({"id": id})
    
    if user is None:
        return {"error": "User not found"}
    
    return User(**user)


@app.put('/change-user-details', tags=["user"])
async def change_user(user: User):
    existing_user = database["users"].find_one({"id": user.id})
    
    if existing_user:
        update_data = {
            "fullname": user.fullname,
            "email": user.email,
            "contactNo": user.contactNo
        }

        database["users"].update_one({"id": user.id}, {"$set": update_data})
        
        return {"message": "User details updated successfully"}
    else:
        return {"error": "User not found"}



@app.post('/add-vehicles',tags=["vehicles"])
async def add_vehicle(vehicle:Vehicle):
    try:
        result = database["vehicle"].insert_one(vehicle.dict())
    except Exception as e:
        return {"error": str(e)}
    return "success"
    

@app.get('/vehicles',tags=["vehicles"])
async def get_vehicle():    
    vehicles = []    
    vehicles_cursor = database["vehicle"].find()    
    
    for  vehicle in vehicles_cursor:        
        vehicles.append(Vehicle(**vehicle))    
        
    return vehicles


@app.get('/get-vehicles-sellerId/{id}',tags=["vehicles"])
async def get_vehicle_by_user_id(id:int):
    vehicles = []
    vehicles_cursor = database["vehicle"].find({"sellerId":id})
    for vehicle in vehicles_cursor:
        vehicles.append(Vehicle(**vehicle))

    return vehicles    
    
@app.post('/prediction', tags=["Prediction"])
async def predict_price(request: Prediction):
    # Convert the request data to a dictionary
    data_dict = request.dict()
    
    # Create a DataFrame from the input data with appropriate data types
    input_data = pd.DataFrame([data_dict], dtype=np.float64)

    # Predict the price using the model
    try:
        predicted_price = model.predict(input_data)
    except Exception as e:
        return {"error": str(e)}

    # Return the predicted price
    return float(predicted_price[0])   

