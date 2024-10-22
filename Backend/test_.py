import pytest
from fastapi.testclient import TestClient
from main import app  # Import your FastAPI app

client = TestClient(app)

# Mock Data for Testing
mock_user = {
    "id": 1234567,
    "fullname": "Navindu Abekoon",
    "email": "navindu@gmail.com",
    "password": "navindu"
}
mock_loging = {
    "email": "navindu@gmail.com",
    "password": "navindu"
}
mock_vehicle = {
    "year": "2002",
    "manufacturer": "Toyota",
    "model": "Premeo",
    "condition": "clear",
    "fuel": "petrol",  # Corrected from 'pettrol' to 'petrol'
    "odometer": 45000,
    "title_status": "good",
    "transmission": "",
    "type": "car",
    "age": 22,
    "userid": 1234,
    "price": "230000"
}
mock_prediction_request = {
    "year": 2,
    "manufacturer": 1,
    "model": 0,
    "condition": 1,
    "fuel": 1,
    "odometer": 45000,
    "title_status": 2,
    "transmission": 0,
    "type": 1,
    "age": 22
    # Add other features as per your model
}

### Test Cases ###

# 1. Test Add User
def test_add_user():
    response = client.post("/add-user", json=mock_user)
    assert response.status_code == 200
    assert response.json() == "success"
    print("Test Add User Passed")

# 2. Test User Login
def test_login():
    response = client.post("/login", json=mock_loging)
    assert response.status_code == 200
    assert "access_token" in response.json()
    print("Test User Login Passed")

# 3. Test Get User by Email
def test_get_user():
    email = mock_user["email"]
    response = client.get(f"/get_user/{email}")
    assert response.status_code == 200
    assert response.json()["email"] == email
    print("Test Get User by Email Passed")

# 4. Test Add Vehicle
def test_add_vehicle():
    response = client.post("/add-vehicles", json=mock_vehicle)
    assert response.status_code == 200
    assert response.json() == "success"
    print("Test Add Vehicle Passed")

# 5. Test Get All Vehicles
def test_get_vehicles():
    response = client.get("/vehicles")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    print("Test Get All Vehicles Passed")

# 6. Test Get Vehicle by User ID
def test_get_vehicle_by_user_id():
    userid = mock_vehicle["userid"]
    response = client.get(f"/get-vehicles-userid/{userid}")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    print("Test Get Vehicle by User ID Passed")

# 7. Test Price Prediction
def test_predict_price():
    response = client.post("/prediction", json=mock_prediction_request)
    assert response.status_code == 200
    assert isinstance(response.json(), float)
    print("Test Price Prediction Passed")
