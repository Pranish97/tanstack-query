import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const queryClient = useQueryClient();

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");

  const updateTodo = useMutation({
    mutationFn: ({id, title}: {id:number, title: string }) => {
      return axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        title,
        completed: false,
        userId: 1,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleUpdate = () => {
    const numbericId = Number(id)

    if (!numbericId || !title.trim()) return;
        
    updateTodo.mutate({id: numbericId, title})
    setId("")
    setTitle("")
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Update Todo</h2>

      <input 
      type="number"
      value={id}
      onChange={(e) =>setId(e.target.value)}
      placeholder="Enter ID"
      style={{ marginRight: "0.5rem" }}
      />

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter Todo Title"
        style={{ marginRight: "0.5rem" }}
      />
      <button onClick={handleUpdate} disabled={updateTodo.isPending}>
        {updateTodo.isPending ? "Updating..." : "Update Todo"}
      </button>

      {updateTodo.isSuccess && <p style={{marginTop: "1rem", color: "green"}}>Todo Updated Successfully!!</p>}
      {updateTodo.isError && <p style={{marginTop:"1rem", color:"red"}}>{updateTodo.error.message}</p>}
    </div>
  );
}

export default App;
