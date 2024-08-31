from fastapi import FastAPI
from config.config import database
from models.models import User,Vehicle,Prediction
from fastapi.middleware.cors import CORSMiddleware 
import pickle
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


@app.post('/add-user',tags=["user"])
async def add_user(user: User):
    result = await database["users"].insert_one(user.dict())
    return "success"


@app.get('/get_user/{id}',tags=["user"])
async def get_user(id:str):
    user = await database["users"].find_one({"id": id})
    if user:
        user['id'] = str(user['_id'])  # Convert ObjectId to string
        return User(**user)
     

@app.post('/add-vehicles',tags=["vehicles"])
async def add_vehicle(vehicle:Vehicle):
    try:
        result = await database["vehicle"].insert_one(vehicle.dict())
    except Exception as e:
        return {"error": str(e)}
    return "success"
    

@app.get('/vehicles',tags=["vehicles"])
async def get_vehicle():
    vehicles = []
    vehicles_cursor = database["vehicle"].find()
    async for  vehicle in vehicles_cursor:
        vehicles.append(Vehicle(**vehicle))

    return vehicles

@app.get('/get-vehicles-userid/{id}',tags=["vehicles"])
async def get_vehicle_by_user_id(id:str):
    vehicles = []
    vehicles_cursor = database["vehicle"].find({"user_id":id})
    async for vehicle in vehicles_cursor:
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

