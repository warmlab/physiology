from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload

#from ..models.Terminology import Terminology
#from ..schemas.Terminology import TerminologyCreate, TerminologyRead

from .. import models, schemas
from ..database import get_db

from ..models import Terminology

router = APIRouter(prefix="/terminologies", tags=["Terminologies"])


@router.post("/", response_model=schemas.TerminologyRead)
async def create_terminology(terminology: schemas.TerminologyCreate, db: AsyncSession = Depends(get_db)):
    print(terminology)
    print(terminology.model_dump())
    async with db.begin():
        db_terminology = Terminology(**terminology.model_dump())
        db.add(db_terminology)
        # db.commit()
    db.refresh(db_terminology)
    return db_terminology


@router.get("/", response_model=list[schemas.TerminologyRead])
async def read_Terminologies(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Terminology)
    )
    terminologies = result.scalars().all()
    return terminologies


@router.get("/{terminology_id}", response_model=schemas.TerminologyRead)
async def read_Terminology(terminology_id: int, db: AsyncSession = Depends(get_db)):
    # terminology = await db.query(Terminology).filter(Terminology.id == terminology_id).first()
    result = await db.execute(
        select(Terminology).filter(Terminology.id == terminology_id)
    )
    terminology = result.scalar_one_or_none()
    if not terminology:
        raise HTTPException(status_code=404, detail="Terminology not found")
    return terminology
