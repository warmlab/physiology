from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from authlib.jose import jwt, JoseError
from fastapi.security import OAuth2PasswordBearer

from .. import models
from ..database import get_db
from ..security import SECRET_KEY

router = APIRouter(prefix="/bookings", tags=["bookings"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        claims = jwt.decode(token, SECRET_KEY)
        claims.validate()  # this checks exp, etc.
        user_id = int(claims["sub"])
        user = db.query(models.User).filter(models.User.id == user_id).first()
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except JoseError as e:
        raise HTTPException(status_code=401, detail="Invalid token: {e}".format(e=e))


@router.post("/book")
def book(date: str, time: str, service: str, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    booking = models.Booking(user_id=current_user.id, date=date, time=time, service=service)
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return {"message": "Booking successful!"}


@router.get("")
def get_bookings(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role == "admin":
        return db.query(models.Booking).all()
    return db.query(models.Booking).filter(models.Booking.user_id == current_user.id).all()


@router.delete("/cancel/{booking_id}")
def cancel_booking(booking_id: int, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    booking = db.query(models.Booking).filter(models.Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    if current_user.role != "admin" and booking.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Unauthorized")
    db.delete(booking)
    db.commit()
    return {"message": "Booking canceled successfully"}
