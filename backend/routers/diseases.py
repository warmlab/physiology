from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/diseases", tags=["diseases"])


@router.post("/", response_model=schemas.DiseaseRead)
def create_disease(disease: schemas.DiseaseCreate, db: Session = Depends(get_db)):
    db_disease = models.disease(**disease.dict())
    db.add(db_disease)
    db.commit()
    db.refresh(db_disease)
    return db_disease


@router.get("/", response_model=list[schemas.DiseaseRead])
def read_diseases(db: Session = Depends(get_db)):
    return db.query(models.disease).all()


@router.get("/{disease_id}", response_model=schemas.DiseaseRead)
def read_disease(disease_id: int, db: Session = Depends(get_db)):
    disease = db.query(models.disease).filter(models.disease.id == disease_id).first()
    if not disease:
        raise HTTPException(status_code=404, detail="disease not found")
    return disease
