from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, SmallInteger, UniqueConstraint
# from sqlalchemy import Enum as SQLEnum
from sqlalchemy.orm import relationship, Mapped, mapped_column

from .database import Base
# from .enums import UserRole


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    username: Mapped[str] = mapped_column(String(64), unique=True, nullable=False, index=True)
    email: Mapped[str] = mapped_column(String(128), unique=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String, nullable=False)
    role: Mapped[str] = mapped_column(String(16), default='CUSTOMER')
    add_time: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)

    favorites = relationship("UserFavorite", back_populates="user", cascade="all, delete")
    muscles: Mapped[list["UserMuscle"]] = relationship("UserMuscle", back_populates="user", cascade="all, delete")
    terminology: Mapped[list["UserTerminology"]] = relationship("UserTerminology", back_populates="user", cascade="all, delete")

    def __repr__(self) -> str:
        return self.username


class UserFavorite(Base):
    __tablename__ = "user_favorites"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    item_type: Mapped[str] = mapped_column(String(31))  # 'muscle' or 'terminology'
    item_id: Mapped[int] = mapped_column(Integer)
    add_time: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)

    __table_args__ = (
        UniqueConstraint("user_id", "item_type", "item_id", name="unique_user_favorite"),
    )

    # Optional relationship
    user = relationship("User", back_populates="favorites")


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


class UserMuscle(Base):
    __tablename__ = 'user_muscles'

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    muscle_id: Mapped[int] = mapped_column(ForeignKey("muscles.id", ondelete="CASCADE"))
    add_time: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)

    __table_args__ = (
        UniqueConstraint("user_id", "muscle_id", name="unique_user_muscle"),
    )

    # Optional relationship
    user = relationship("User", back_populates="muscles")


class UserTerminology(Base):
    __tablename__ = 'user_terminology'

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    terminology_id: Mapped[int] = mapped_column(ForeignKey("terminology.id", ondelete="CASCADE"))
    add_time: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)

    __table_args__ = (
        UniqueConstraint("user_id", "terminology_id", name="unique_user_terminology"),
    )

    # Optional relationship
    user: Mapped['User'] = relationship("User", back_populates="terminology")
