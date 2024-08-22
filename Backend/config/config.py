import motor.motor_asyncio

url = 'mongodb://localhost:27017'

client = motor.motor_asyncio.AsyncIOMotorClient(url)

database = client["Second_Hand_Predictor"]
