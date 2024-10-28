import pickle

with open('./Recommendation/simialarity.pkl','rb') as f:
    similarity = pickle.load(f)

with open('./Recommendation/vehicle_list.pkl','rb') as f:
    new_data = pickle.load(f)


def recommand(brand, year):
    recommend_car = []
    if year:
        indices = new_data[(new_data['brand'] == brand) & (new_data['year'] == year)].index
    else:
        indices = new_data[new_data['brand'] == brand].index
    if len(indices) > 0:
        index = indices[0]
        distance = sorted(list(enumerate(similarity[index])), reverse=True, key=lambda vector: vector[1])

        for i in distance[0:5]:
            car = new_data.iloc[i[0]].to_dict()  # Convert the row to a dictionary
            recommend_car.append(car)

        return recommend_car
    else:
        return "No match found for vehicle"
    

    



