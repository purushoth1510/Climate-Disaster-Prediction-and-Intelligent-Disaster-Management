from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from routes import prediction, alerts, analytics

app = FastAPI(title="Disaster HPC Platform")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(prediction.router)
app.include_router(alerts.router)
app.include_router(analytics.router)