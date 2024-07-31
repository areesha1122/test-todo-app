from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

import crud, database, schema

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/todos", response_model=List[schema.TodoRead])
def read_todos(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    todos = crud.get_todos(db, skip=skip, limit=limit)
    return todos

@router.post("/todos", response_model=schema.TodoCreate)
def create_todo(todo: schema.TodoCreate, db: Session = Depends(get_db)):
    return crud.create_todo(db=db, todo=todo)

@router.put("/todos/{id}", response_model=schema.TodoCreate)
def update_todo(id: int, todo: schema.TodoUpdate, db: Session = Depends(get_db)):
    db_todo = crud.get_todo_by_id(db, id)
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return crud.update_todo(db=db, todo_id=id, todo=todo)

@router.delete("/todos/{id}")
def delete_todo(id: int, db: Session = Depends(get_db)):
    db_todo = crud.get_todo_by_id(db, id)
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    crud.delete_todo(db=db, todo_id=id)
    return {"detail": "Todo deleted"}