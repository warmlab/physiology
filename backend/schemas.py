from pydantic import BaseModel
from typing import Optional, List


class UserCreate(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str
    role: str


class BodyPartBase(BaseModel):
    name: str
    note: Optional[str] = None


class BodyPartCreate(BodyPartBase):
    pass


class BodyPartRead(BodyPartBase):
    id: int

    class Config:
        # orm_mode = True
        from_attributes = True


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

    class Config:
        # orm_mode = True
        from_attributes = True


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

    class Config:
        # orm_mode = True
        from_attributes = True


class DiseaseBase(BaseModel):
    name: str
    note: str


class DiseaseCreate(DiseaseBase):
    pass


class DiseaseRead(DiseaseBase):
    id: int

    class Config:
        # orm_mode = True
        from_attributes = True


class TerminologyBase(BaseModel):
    term: str
    slug: str
    definition: Optional[str] = None
    note: Optional[str] = None


class TerminologyCreate(TerminologyBase):
    pass


class TerminologyRead(TerminologyBase):
    id: int

    class Config:
        # orm_mode = True
        from_attributes = True
