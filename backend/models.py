from sqlalchemy import Column, Integer, String, ForeignKey, SmallInteger
from sqlalchemy import Enum as SQLEnum
from sqlalchemy.orm import relationship, Mapped, mapped_column

from .database import Base
from .enums import UserRole


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    username: Mapped[str] = mapped_column(String(64), unique=True, nullable=False, index=True)
    email: Mapped[str] = mapped_column(String(128), unique=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String, nullable=False)
    role: Mapped[UserRole] = mapped_column(SQLEnum(UserRole, name="userrole"), default=UserRole.CUSTOMER)

    def __repr__(self) -> str:
        return self.username


class Booking(Base):
    __tablename__ = "bookings"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    date = Column(String)
    time = Column(String)
    service = Column(String)
    user = relationship("User")


class BodyPart(Base):
    __tablename__ = "body_parts"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    slug: Mapped[str] = mapped_column(String(32), nullable=True)
    name: Mapped[str] = mapped_column(String(127))
    note: Mapped[str] = mapped_column(String, nullable=True)

    # Optional: show reverse relationship
    muscles: Mapped[list["Muscle"]] = relationship("Muscle", back_populates="body_part")
    bony_landmarks: Mapped[list["BonyLandmark"]] = relationship("BonyLandmark", back_populates="body_part")

    def __repr__(self) -> str:
        return self.name


class Muscle(Base):
    __tablename__ = "muscles"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    slug: Mapped[str] = mapped_column(String(32), nullable=True)
    name: Mapped[str] = mapped_column(String(127))
    action: Mapped[str] = mapped_column(String, nullable=True)
    origin: Mapped[str] = mapped_column(String, nullable=True)
    insertion: Mapped[str] = mapped_column(String, nullable=True)
    innervation: Mapped[str] = mapped_column(String(127), nullable=True)
    palpation_key: Mapped[str] = mapped_column(String, nullable=True)
    note: Mapped[str] = mapped_column(String, nullable=True)
    year: Mapped[int] = mapped_column(SmallInteger, default=1, nullable=True)
    module: Mapped[int] = mapped_column(SmallInteger, default=1, nullable=True)

    # Add foreign key column
    body_part_id: Mapped[int] = mapped_column(ForeignKey("body_parts.id"), nullable=True)

    # Set up the relationship
    body_part: Mapped["BodyPart"] = relationship("BodyPart", back_populates="muscles", lazy="joined")

    def __repr__(self) -> str:
        return self.name


class BonyLandmark(Base):
    __tablename__ = "bony_landmarks"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    slug: Mapped[str] = mapped_column(String(32), nullable=True)
    name: Mapped[str] = mapped_column(String(127))
    note: Mapped[str] = mapped_column(String, nullable=True)

    # Add foreign key column
    body_part_id: Mapped[int] = mapped_column(ForeignKey("body_parts.id"), nullable=True)

    # Set up the relationship
    body_part: Mapped["BodyPart"] = relationship("BodyPart", back_populates="bony_landmarks")

    def __repr__(self) -> str:
        return self.name


class Disease(Base):
    __tablename__ = "disease"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(127))
    note: Mapped[str] = mapped_column(String, nullable=True)

    def __repr__(self) -> str:
        return self.name


class Terminology(Base):
    __tablename__ = "terminology"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    slug: Mapped[str] = mapped_column(String(32), nullable=True)
    term: Mapped[str] = mapped_column(String(127), nullable=False)
    definition: Mapped[str] = mapped_column(String, nullable=True)
    note: Mapped[str] = mapped_column(String, nullable=True)

    def __repr__(self) -> str:
        return self.name
