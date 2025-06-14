from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload

from uuid import uuid4
from random import randint

#from ..models.muscle import Muscle
#from ..schemas.muscle import MuscleCreate, MuscleRead

from ..models import Muscle
from ..schemas import MuscleRead, MuscleCreate
from ..database import get_db

router = APIRouter(prefix="/muscles", tags=["muscles"])


@router.post("/", response_model=MuscleRead)
def create_muscle(muscle: MuscleCreate, db: AsyncSession = Depends(get_db)):
    db_muscle = Muscle(**muscle.model_dump())
    db_muscle.slug = uuid4().hex
    db.add(db_muscle)
    db.commit()
    db.refresh(db_muscle)
    return db_muscle


@router.get("/", response_model=list[MuscleRead])
async def read_muscles(limit: int = -1, page: int = 0, db: AsyncSession = Depends(get_db)):
    page_size = 5

    if limit < 0:
        result = await db.execute(
            select(Muscle).options(selectinload(Muscle.body_part))
        )
    else:
        result = await db.execute(
            select(Muscle).options(selectinload(Muscle.body_part)).limit(limit=limit)
        )
    muscles = result.scalars().all()
    return muscles


@router.get("/{slug}", response_model=MuscleRead)
async def read_muscle(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Muscle).options(selectinload(Muscle.body_part)).filter(Muscle.slug == slug)
    )
    muscle = result.scalar_one_or_none()
    if not muscle:
        raise HTTPException(status_code=404, detail="Muscle not found")
    muscle.reminder = ['name', 'action', 'origin', 'insertion'][randint(0, 3)]
    return muscle
