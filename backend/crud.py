from sqlalchemy.orm import Session
from database import TodoItem
from schema import TodoCreate, TodoUpdate

def get_todos(db: Session, skip: int = 0, limit: int = 10):
    return db.query(TodoItem).offset(skip).limit(limit).all()

def create_todo(db: Session, todo: TodoCreate):
    db_todo = TodoItem(**todo.dict())
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

def get_todo_by_id(db: Session, todo_id: int):
    return db.query(TodoItem).filter(TodoItem.id == todo_id).first()

def update_todo(db: Session, todo_id: int, todo: TodoUpdate):
    db_todo = get_todo_by_id(db, todo_id)
    if db_todo:
        update_data = todo.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_todo, key, value)
        db.commit()
        db.refresh(db_todo)
    return db_todo

def delete_todo(db: Session, todo_id: int):
    db_todo = get_todo_by_id(db, todo_id)
    if db_todo:
        db.delete(db_todo)
        db.commit()
    return db_todo