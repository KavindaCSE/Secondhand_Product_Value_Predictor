from fastapi import FastAPI
from jwt_auth.jwt import create_access_token
from config.config import database
from models.models import User,Vehicle,Prediction,NewUser,Credentials,Token,NewPassword,recommendation
from fastapi.middleware.cors import CORSMiddleware 
import pickle
from passlib.context import CryptContext
import pandas as pd
import numpy as np
from Recommendation.recommendation import recommand

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

@app.post('/api/add-user',tags=["user"])
async def add_user(user: NewUser):
    hashed_pw = pwd_cxt.hash(user.password)
    user = user.dict()
    user["password"] = hashed_pw
    result = database["users"].insert_one(user)
    return "success"

@app.post('/api/login', tags=["user"])
async def login(request: Credentials):
    user = database["users"].find_one({"email": request.email})

    if user is None:
        return "User not found"

    if not pwd_cxt.verify(request.password, user["password"]):
        return "Invalid password"

    access_token = create_access_token(data={"sub": user["id"]})
    return Token(access_token=access_token, token_type="bearer")


@app.put('/api/change-password',tags=["user"])
async def changePassword(request:NewPassword):
    user = database["users"].find_one({"id":request.id})

    if not pwd_cxt.verify(request.currentPassword, user["password"]):
        return "Invalid Current password"

    if (request.confirmPassword != request.newPassword):
        return "New Password Invalid"

    updatePW = {"password" : pwd_cxt.hash(request.confirmPassword) }
    database["users"].update_one({"id": request.id}, {"$set": updatePW})
    return "Password Changed!"    
    

@app.get('/api/get_user/{id}', tags=["user"])
async def get_user(id: int):
    user = database["users"].find_one({"id": id})
    
    if user is None:
        return {"error": "User not found"}
    
    return User(**user)


@app.put('/api/change-user-details', tags=["user"])
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



@app.post('/api/add-vehicles',tags=["vehicles"])
async def add_vehicle(vehicle:Vehicle):
    try:
        result = database["vehicle"].insert_one(vehicle.dict())
    except Exception as e:
        return {"error": str(e)}
    return "success"
    

@app.get('/api/vehicles',tags=["vehicles"])
async def get_vehicle():    
    vehicles = []    
    vehicles_cursor = database["vehicle"].find().limit(30)   
    
    for  vehicle in vehicles_cursor:        
        vehicles.append(Vehicle(**vehicle))    
        
    return vehicles_cursor


@app.get('/api/get-vehicles-sellerId/{id}',tags=["vehicles"])
async def get_vehicle_by_user_id(id:int):
    vehicles = []
    vehicles_cursor = database["vehicle"].find({"sellerId":id}).limit(30)
    for vehicle in vehicles_cursor:
        vehicles.append(Vehicle(**vehicle))

    return vehicles    
    
@app.post('/api/prediction', tags=["Prediction"])
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
    return round(float(predicted_price[0]), 2)  

@app.post('/api/recommendation',tags=["recommendations"])
async def recommendations(request :recommendation):
    recomended_cars = []
    respond = recommand(request.model , request.year)

    # for vehicle in respond:
    #     recomended_cars.append(Vehicle(**vehicle))

    return respond

    


