import os
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

load_dotenv()

mongo_user = os.getenv('MONGO_USER')
mongo_pass = os.getenv('MONGO_PASS')

url = f"mongodb+srv://{mongo_user}:{mongo_pass}@cluster0.jsp7h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
# Create a new client and connect to the server
client = MongoClient(url, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection

database = client.Second_Hand_Predictor

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)