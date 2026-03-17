from datetime import datetime
from pydantic import BaseModel, ConfigDict


class NoteCreate(BaseModel):
    title: str
    content: str = ""


class NoteResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    content: str
    created_at: datetime
