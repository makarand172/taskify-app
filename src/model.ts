export default interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
}

export type TodoActions =
  | { type: "add"; payload: string }
  | { type: "remove"; payload: number }
  | { type: "edit"; payload: { id: number; editText: string } }
  | { type: "done"; payload: number };
