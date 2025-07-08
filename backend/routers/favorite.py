from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql.expression import select, delete, func
from sqlalchemy.dialects.postgresql import insert

from ..database import get_db
from .auth import get_current_user
from ..models import UserFavorite, Terminology, Muscle
from ..models import UserMuscle, UserTerminology, User
from ..schemas import FavoriteRead, FavoriteCreate
from ..schemas import UserMuscleRead, UserMuscleCreate, UserTerminologyRead, UserTerminologyCreate
# from ..enums import UserRole

router = APIRouter(prefix="/my", tags=["favorite"])


@router.get("/favorite/list")
async def list_favorite(item_type: str,
                        page: int = 1,
                        user: User = Depends(get_current_user),
                        db: AsyncSession = Depends(get_db)):
    page_size = 7  # TODO Maybe this variable comes from the page setting
    # Get total count
    total_query = await db.execute(
        select(func.count()).select_from(UserFavorite).where(
                UserFavorite.user_id == user.id,
                UserFavorite.item_type == item_type))
    total_count = total_query.scalar()
    total_pages = (total_count + page_size - 1) // page_size  # Ceiling division

    result = await db.execute(
        select(UserFavorite).where(
            UserFavorite.user_id == user.id,
            UserFavorite.item_type == item_type)
        .order_by(UserFavorite.add_time)
        .offset((page - 1) * page_size)
        .limit(page_size)
    )
    # if limit < 0:
    #     result = await db.execute(
    #         select(Muscle).options(selectinload(Muscle.body_part))
    #     )
    # else:
    #     result = await db.execute(
    #         select(Muscle).options(selectinload(Muscle.body_part)).limit(limit=limit)
    #     )
    favorites = result.scalars().all()
    return {
        "favorites": [FavoriteRead.model_validate(f) for f in favorites],
        "total_pages": total_pages,
        "current_page": page,
    }


@router.post("/favorite")
async def add_favorite(fav: FavoriteCreate,
                       user: User = Depends(get_current_user),
                       db: AsyncSession = Depends(get_db)):
    stmt = insert(UserFavorite).values(
        user_id=user.id,
        item_type=fav.item_type,
        item_id=fav.item_id).on_conflict_do_nothing()

    await db.execute(stmt)
    await db.commit()
    return {"status": "added"}


@router.delete("/favorite")
async def remove_favorite(fav: FavoriteCreate,
                          user: User = Depends(get_current_user),
                          db: AsyncSession = Depends(get_db)):
    stmt = delete(UserFavorite).where(
        UserFavorite.user_id == user.id,
        UserFavorite.item_type == fav.item_type,
        UserFavorite.item_id == fav.item_id
    )
    await db.execute(stmt)
    await db.commit()
    return {"status": "removed"}

@router.get("/favorite/check")
async def check_favorite(item_type: str, item_id: int, user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(UserFavorite).where(
            UserFavorite.user_id == user.id,
            UserFavorite.item_type == item_type,
            UserFavorite.item_id == item_id
        )
    )
    return {"favorited": result.scalar_one_or_none() is not None}


@router.post("/muscle", response_model=UserMuscleRead)
async def add_muscle(fav: UserMuscleCreate, db: AsyncSession = Depends(get_db), user: User = Depends(get_current_user)):
    item = UserMuscle(user_id=user.id, muscle_id=fav.muscle_id)
    db.add(item)
    await db.commit()
    await db.refresh(item)
    return item


@router.get("/muscle/list", response_model=list[UserMuscleRead])
async def list_muscles(db: AsyncSession = Depends(get_db), user: User = Depends(get_current_user)):
    result = await db.execute(select(UserMuscle).where(UserMuscle.user_id == user.id))
    return result.scalars().all()


@router.delete("/muscle/{muscle_slug}")
async def remove_muscle(muscle_slug: str, db: AsyncSession = Depends(get_db), user: User = Depends(get_current_user)):
    # Get the muscle by slug
    result = await db.execute(select(Muscle).where(Muscle.slug == muscle_slug))
    muscle = result.scalar_one_or_none()
    if not muscle:
        raise HTTPException(status_code=404, detail="Muscle not found")

    # Delete UserMuscle entry
    await db.execute(delete(UserMuscle).where(UserMuscle.user_id == user.id, UserMuscle.muscle_id == muscle.id))
    await db.commit()
    return {"status": "removed"}


@router.post("/terminology", response_model=UserTerminologyRead)
async def add_terminology(fav: UserTerminologyCreate, db: AsyncSession = Depends(get_db), user: User = Depends(get_current_user)):
    item = UserTerminology(user_id=user.id, terminology_id=fav.terminology_id)
    db.add(item)
    await db.commit()
    await db.refresh(item)
    return item


@router.get("/terminology/list", response_model=list[UserTerminologyRead])
async def list_terminologies(db: AsyncSession = Depends(get_db), user: User = Depends(get_current_user)):
    result = await db.execute(select(UserTerminology).where(UserTerminology.user_id == user.id))
    return result.scalars().all()


@router.delete("/terminology/{terminology_slug}")
async def remove_terminology(terminology_slug: str, db: AsyncSession = Depends(get_db), user: User = Depends(get_current_user)):
    # get the terminology by slug
    result = await db.execute(select(Terminology).where(Terminology.slug == terminology_slug))
    terminology = result.scalar_one_or_none()
    if not terminology:
        raise HTTPException(status_code=404, detail="Muscle not found")
    await db.execute(delete(UserTerminology).where(UserTerminology.user_id == user.id, UserTerminology.terminology_id == terminology.id))
    await db.commit()
    return {"status": "removed"}
