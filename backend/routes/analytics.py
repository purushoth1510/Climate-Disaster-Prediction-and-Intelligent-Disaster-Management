from fastapi import APIRouter

router = APIRouter()

@router.get("/analytics")

def analytics():

    return {
        "flood":[10,20,30,50,60],
        "cyclone":[5,10,20,25,30]
    }