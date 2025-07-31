import React, { useEffect, useRef, useState } from "react";
import Todo, { TodoActions } from "../../model";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdClose, MdDone } from "react-icons/md";
import "./TodoCard.css";

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.ActionDispatch<[action: TodoActions]>;
}

const TodoCard = ({ todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodoText, setEditTodoText] = useState<string>(todo.todo);

  const handleDone = (id: number) => {
    setTodos({ type: "done", payload: id });
  };

  const handleDelete = (id: number) => {
    setTodos({ type: "remove", payload: id });
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos({ type: "edit", payload: { id, editText: editTodoText } });
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <form
      className="todos_single"
      onSubmit={(e) => {
        handleEdit(e, todo.id);
      }}
    >
      {edit ? (
        <input
          ref={inputRef}
          className="todos_single--text"
          value={editTodoText}
          onChange={(e) => {
            setEditTodoText(e.target.value);
          }}
        />
      ) : todo.isDone ? (
        <s className="todos_single--text">{todo.todo}</s>
      ) : (
        <span className="todos_single--text">{todo.todo}</span>
      )}

      <div>
        <span
          className="icon"
          onClick={() => {
            setEdit(!edit);
          }}
        >
          <AiFillEdit />
        </span>
        <span
          className="icon"
          onClick={() => {
            handleDelete(todo.id);
          }}
        >
          <AiFillDelete />
        </span>
        <span
          className="icon"
          onClick={() => {
            handleDone(todo.id);
          }}
        >
          {todo.isDone ? <MdClose /> : <MdDone />}
        </span>
      </div>
    </form>
  );
};

export default TodoCard;
