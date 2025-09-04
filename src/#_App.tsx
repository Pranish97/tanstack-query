import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");

  const mutation = useMutation({
    mutationFn: (newTodo: { title: string }) => {
      return axios.post("https://jsonplaceholder.typicode.com/todos", {
        ...newTodo,
        userId: 1,
        completed: false,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleAdd = () => {
    if (title.trim()) {
      mutation.mutate({ title });
      setTitle("");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Add Todo</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter Todo Title"
        style={{ marginRight: "0.5rem" }}
      />
      <button onClick={handleAdd} disabled={mutation.isPending}>
        {mutation.isPending ? "Adding..." : "Add Todo"}
      </button>

      {mutation.isSuccess && <p>Added!</p>}
      {mutation.isError && <p>{mutation.error.message}</p>}
    </div>
  );
}

export default App;
