from fastapi import APIRouter
from services.weather_service import get_weather
from ml_model.predictor import predict_disaster

router = APIRouter()

@router.get("/predict/{city}")

def predict(city:str):

    weather = get_weather(city)

    result = predict_disaster(
        weather["temperature"],
        weather["humidity"],
        weather["rain"],
        weather["wind"]
    )

    return {
        "weather":weather,
        "prediction":result
    }