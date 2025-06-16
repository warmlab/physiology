from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
# from sqlalchemy.future import select
from sqlalchemy.sql.expression import func, select
# from sqlalchemy.orm import selectinload

#from ..models.Terminology import Terminology
#from ..schemas.Terminology import TerminologyCreate, TerminologyRead

from .. import models, schemas
from ..database import get_db

from ..models import Terminology

router = APIRouter(prefix="/terminology", tags=["Terminology"])


@router.post("/create", response_model=schemas.TerminologyRead)
async def create_terminology(terminology: schemas.TerminologyCreate, db: AsyncSession = Depends(get_db)):
    async with db.begin():
        db_terminology = Terminology(**terminology.model_dump())
        db_terminology.slug = terminology.name.lower().replace(' ', '_')
        db.add(db_terminology)
        # db.commit()
    db.refresh(db_terminology)
    return db_terminology


@router.get("/list", response_model=list[schemas.TerminologyRead])
async def read_Terminologies(limit: int = -1, page: int = 1, random: bool = False, db: AsyncSession = Depends(get_db)):
    page_size = 7  # TODO Maybe this variable comes from the page setting

    if random:
        result = await db.execute(
            select(Terminology).order_by(func.random()).limit(limit if limit>0 else 5)
        )
    else:
        page = page 
        result = await db.execute(
            select(Terminology).offset((page - 1) * page_size).limit(page_size)
        )
    terms = result.scalars().all()
    return terms


@router.get("/detail/{slug}", response_model=schemas.TerminologyRead)
async def read_Terminology(slug: str, db: AsyncSession = Depends(get_db)):
    # terminology = await db.query(Terminology).filter(Terminology.id == terminology_id).first()
    result = await db.execute(
        select(Terminology).filter(Terminology.slug == slug)
    )
    terminology = result.scalar_one_or_none()
    if not terminology:
        raise HTTPException(status_code=404, detail="Terminology not found")
    return terminology
