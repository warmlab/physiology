from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload

#from ..models.muscle import Muscle
#from ..schemas.muscle import MuscleCreate, MuscleRead

from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/muscles", tags=["muscles"])


@router.post("/", response_model=schemas.MuscleRead)
def create_muscle(muscle: schemas.MuscleCreate, db: AsyncSession = Depends(get_db)):
    db_muscle = models.Muscle(**muscle.dict())
    db.add(db_muscle)
    db.commit()
    db.refresh(db_muscle)
    return db_muscle


@router.get("/", response_model=list[schemas.MuscleRead])
async def read_muscles(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(models.Muscle).options(selectinload(models.Muscle.body_part))
    )
    muscles = result.scalars().all()
    return muscles


@router.get("/{muscle_id}", response_model=schemas.MuscleRead)
def read_muscle(muscle_id: int, db: AsyncSession = Depends(get_db)):
    muscle = db.query(models.Muscle).filter(models.Muscle.id == muscle_id).first()
    if not muscle:
        raise HTTPException(status_code=404, detail="Muscle not found")
    return muscle
