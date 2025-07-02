from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql.expression import select, delete, func
from sqlalchemy.dialects.postgresql import insert

from ..database import get_db
from .auth import get_current_user
from ..models import UserFavorite, User
from ..schemas import FavoriteRead, FavoriteCreate
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
