import React, { useReducer, useState } from "react";
import "./App.css";
import InputField from "./components/InputField/InputField";
import Todo, { TodoActions } from "./model";
import TodoList from "./components/TodoList/TodoList";

const TodoReducer = (state: Todo[], action: TodoActions) => {
  switch (action.type) {
    case "add":
      return [
        ...state,
        { id: Date.now(), todo: action.payload, isDone: false },
      ];
    case "remove":
      return state.filter((todo) => todo.id !== action.payload);
    case "done":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
      );
    case "edit":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, todo: action.payload.editText }
          : todo
      );
    default:
      return state;
  }
};

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");

  const [state, dispatch] = useReducer(TodoReducer, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      dispatch({ type: "add", payload: todo });
      setTodo("");
    }
  };
  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={state} setTodos={dispatch} />
    </div>
  );
};

export default App;
