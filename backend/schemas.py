from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional, List

from .enums import UserRole


class UserBase(BaseModel):
    username: str
    email: EmailStr
    role: Optional[UserRole] = UserRole.CUSTOMER


class UserCreate(UserBase):
    password: str  # plain password for signup


class UserRead(UserBase):
    id: int

    model_config = ConfigDict(
            from_attributes=True,
            use_enum_values=True)


class UserInDB(UserBase):
    hashed_password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserRead


class BodyPartBase(BaseModel):
    name: str
    note: Optional[str] = None


class BodyPartCreate(BodyPartBase):
    pass


class BodyPartRead(BodyPartBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


class MuscleBase(BaseModel):
    name: str
    slug: Optional[str] = None
    action: Optional[str] = None
    origin: Optional[str] = None
    insertion: Optional[str] = None
    innervation: Optional[str] = None
    palpation_key: Optional[str] = None
    year: Optional[int] = 1
    module: Optional[int] = 1
    note: Optional[str] = None


class MuscleCreate(MuscleBase):
    body_part_id: Optional[int] = None  # Foreign key field


class MuscleRead(MuscleBase):
    id: int
    body_part: Optional[BodyPartRead] = None  # Full related object
    reminder: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class MuscleList(BaseModel):
    muscles: List[MuscleRead]
    total_pages: int
    current_page: int


class BonyLandmarkBase(BaseModel):
    name: str
    note: str


class BonyLandmarkCreate(BonyLandmarkBase):
    pass


class BonyLandmarkRead(BonyLandmarkBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


class DiseaseBase(BaseModel):
    name: str
    note: str


class DiseaseCreate(DiseaseBase):
    pass


class DiseaseRead(DiseaseBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


class TerminologyBase(BaseModel):
    term: str
    slug: str
    definition: Optional[str] = None
    note: Optional[str] = None


class TerminologyCreate(TerminologyBase):
    pass


class TerminologyRead(TerminologyBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
