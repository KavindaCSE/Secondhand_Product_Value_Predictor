import pickle

with open('./xgb_model.pkl','rb') as f:
    model = pickle.load(f)

print(model)