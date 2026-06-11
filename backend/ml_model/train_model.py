import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

data = pd.DataFrame({
"temperature":[30,35,25,40,22,45,33],
"humidity":[70,80,60,85,55,90,75],
"rain":[5,20,0,40,0,50,10],
"wind":[10,15,5,20,4,25,12],
"disaster":[1,1,0,1,0,1,0]
})

X = data[['temperature','humidity','rain','wind']]
y = data['disaster']

model = RandomForestClassifier()

model.fit(X,y)

joblib.dump(model,"model.pkl")

print("Model trained")