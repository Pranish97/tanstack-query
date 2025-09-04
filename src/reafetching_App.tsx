import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import type { Todo } from "./types";

const getToDos = async (): Promise<Todo[]> => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  return response.data;
};

const addTodos = async (newTodo: { title: string }) => {
  return await axios.post(
    "https://jsonplaceholder.typicode.com/todos",
    {
      ...newTodo,
      userId: 1,
      comleted: false,
    }
  );
};

function App() {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");

  const { data, isPending, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: getToDos,
  });

  const mutationTodos = useMutation({
    mutationFn: addTodos,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleAdd = () => {
    if (!title) return;
    mutationTodos.mutate({ title });
    setTitle("");
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Todo List</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter Title"
      />
      <button onClick={handleAdd} disabled={isPending || !title}>
        Add
      </button>
      {mutationTodos.isPending && <p>Adding Todo...</p>}
      {mutationTodos.isSuccess && <p>Todo Added...</p>}
      {mutationTodos.isError && <p>Fail To Add...</p>}

      {
        isLoading? (
          <p>Loading...</p>
        ) : (
          <ul>
            {data?.map((todo) => (
              <li key={todo.id}>
                {todo.title} - {todo.completed ? "Completed" : "Pending"}
              </li>
            ))}
          </ul>
        )
      }
    </div>
  );
}

export default App;
