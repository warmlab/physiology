from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/bonylandmarks", tags=["bonylandmarks"])


@router.post("/", response_model=schemas.BonyLandmarkRead)
def create_bonylandmark(bonylandmark: schemas.BonyLandmarkCreate, db: Session = Depends(get_db)):
    db_bonylandmark = models.bonylandmark(**bonylandmark.dict())
    db.add(db_bonylandmark)
    db.commit()
    db.refresh(db_bonylandmark)
    return db_bonylandmark


@router.get("/", response_model=list[schemas.BonyLandmarkRead])
def read_bonylandmarks(db: Session = Depends(get_db)):
    return db.query(models.bonylandmark).all()


@router.get("/{bonylandmark_id}", response_model=schemas.BonyLandmarkRead)
def read_bonylandmark(bonylandmark_id: int, db: Session = Depends(get_db)):
    bonylandmark = db.query(models.bonylandmark).filter(models.bonylandmark.id == bonylandmark_id).first()
    if not bonylandmark:
        raise HTTPException(status_code=404, detail="bonylandmark not found")
    return bonylandmark
