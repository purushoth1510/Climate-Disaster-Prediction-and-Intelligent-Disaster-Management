from fastapi import APIRouter
from datetime import datetime, timedelta

router = APIRouter()

@router.get("/alerts")
def get_alerts():
    now = datetime.utcnow()

    return [
        {
            "title": "Severe Cyclone Warning - Category 4",
            "severity": "critical",
            "message": "Cyclone intensifying. Expected landfall within 18 hours. Evacuate coastal regions.",
            "location": "Bay of Bengal, India",
            "time": (now - timedelta(minutes=30)).strftime("%H:%M UTC"),
            "source": "Satellite + LSTM Prediction"
        },
        {
            "title": "Flash Flood Alert - Rising Water Levels",
            "severity": "warning",
            "message": "River water levels rising rapidly. Possible flooding in next 6 hours.",
            "location": "Chennai, Tamil Nadu",
            "time": (now - timedelta(hours=1)).strftime("%H:%M UTC"),
            "source": "River Sensor Network + Random Forest"
        },
        {
            "title": "Wildfire Spread Detected",
            "severity": "warning",
            "message": "Firefront spreading toward forest settlements. 89% spread probability.",
            "location": "Uttarakhand, India",
            "time": (now - timedelta(hours=2)).strftime("%H:%M UTC"),
            "source": "CNN + Satellite Imagery"
        },
        {
            "title": "Seismic Activity Detected",
            "severity": "info",
            "message": "Minor tremor detected. Monitoring for aftershocks.",
            "location": "Nepal-India Border",
            "time": (now - timedelta(hours=4)).strftime("%H:%M UTC"),
            "source": "GRU Model + Seismic Network"
        },
        {
            "title": "Heatwave Alert - Resolved",
            "severity": "resolved",
            "message": "Temperatures returning to normal range.",
            "location": "Rajasthan, India",
            "time": (now - timedelta(days=1)).strftime("%H:%M UTC"),
            "source": "Weather Stations"
        }
    ]