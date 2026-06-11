import joblib
import os

model_path = os.path.join(os.path.dirname(__file__), "model.pkl")

model = joblib.load(model_path)

def predict_disaster(temp, humidity, rain, wind):

    result = model.predict([[temp, humidity, rain, wind]])

    if result[0] == 1:
        return "⚠ Disaster Risk Detected"
    else:
        return "No Disaster Risk"