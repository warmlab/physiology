from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer
# from fastapi.security import OAuth2PasswordRequestForm

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql.expression import select

from pydantic import ValidationError

from ..database import get_db
from ..models import User
from ..schemas import UserCreate, UserRead, Token
from ..security import verify_password, hash_password, create_access_token, decode_token
# from ..enums import UserRole
from ..schemas import LoginRequest

import logging


logger = logging.getLogger(__name__)
router = APIRouter(prefix="/auth", tags=["auth"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


async def get_current_user(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)) -> User:
    try:
        payload = decode_token(token)
        user_id: int = int(payload.get("sub"))

        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
            )

        result = await db.execute(select(User).where(User.id == user_id))
        user = result.scalar_one_or_none()

        if user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found",
            )

        return user

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials: %s" % e,
        )


@router.post("/register")
async def register(user: UserCreate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.username == user.username))
    existing_user = result.scalar_one_or_none()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")

    hashed_password = hash_password(user.password)
    new_user = User(username=user.username,
                    email=user.email,
                    hashed_password=hashed_password,
                    role='customer')
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    return {"message": "User registered successfully"}


@router.post("/login", response_model=Token)
async def login(request: Request, db: AsyncSession = Depends(get_db)):
    try:
        body = await request.json()
        data = LoginRequest(**body)  # Pydantic 验证

    except ValidationError as ve:
        logger.warning("Login validation failed: %s", ve.errors())
        raise HTTPException(status_code=422, detail=ve.errors())

    result = await db.execute(select(User).where(User.email == data.email))
    user = result.scalar_one_or_none()

    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token_data = {
        "sub": str(user.id),
        "username": user.username,
        "email": user.email,
        "role": user.role.value if hasattr(user.role, "value") else user.role
    }

    return Token(access_token=create_access_token(token_data),
                 user=UserRead.model_validate(user))


async def login2(payload: LoginRequest, db: AsyncSession = Depends(get_db)):
    logger.info(f'Login payload received: {payload.email}')
    result = await db.execute(select(User).where(User.email == payload.email))
    user = result.scalar_one_or_none()

    if not user or not verify_password(payload.password, user.hashed_password):
        logger.warning(f'Invalid login credentials for {payload.email}')
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token_data = {
        "sub": str(user.id),
        "username": user.username,
        "email": user.email,
        "role": user.role.value if hasattr(user.role, "value") else user.role
    }
    token = create_access_token(token_data)
    return Token(access_token=token, user=UserRead.model_validate(user))


@router.post('/google')
async def google_login(data: dict, db: AsyncSession = Depends(get_db)):
    email = data.get("email")
    name = data.get("name", "")
    avatar = data.get("picture", "")

    if not email:
        raise HTTPException(status_code=400, detail="Missing email from Google")

    result = await db.execute(select(User).where(User.email == email))
    user = result.scalar_one_or_none()

    if not user:
        user = User(
            username=email.split("@")[0],
            email=email,
            hashed_password="",  # Not used
            role="CUSTOMER"
        )
        db.add(user)
        await db.commit()
        await db.refresh(user)

    token = create_access_token({"sub": str(user.id), "username": user.username, "role": user.role})
    return {
        "access_token": token,
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "avatar": avatar  # not stored in DB, but returned for frontend
        }
    }
