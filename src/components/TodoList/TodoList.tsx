import React from "react";
import "./TodoList.css";
import Todo, { TodoActions } from "../../model";
import TodoCard from "../TodoCard/TodoCard";

interface Props {
  todos: Todo[];
  setTodos: React.ActionDispatch<[action: TodoActions]>;
}

const TodoList = ({ todos, setTodos }: Props) => {
  return (
    <div className="todos">
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />
      ))}
    </div>
  );
};

export default TodoList;
