import {  useMutation, useQueryClient } from "@tanstack/react-query";
import "./App.css";
import { useState } from "react";
import axios from "axios";




function App() {
  const queryClient = useQueryClient();

  const [id, setId] = useState("");
  
  const deleteTodo = useMutation({
    mutationFn: (id: number) => {
      return axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}` );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleDelete = () => {
    const numbericId = Number(id)

    if (!numbericId ) return;
        
    deleteTodo.mutate(numbericId)
    setId("")
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Delete Todo</h2>

      <input 
      type="number"
      value={id}
      onChange={(e) =>setId(e.target.value)}
      placeholder="Enter ID"
      style={{ marginRight: "0.5rem" }}
      />

      <button onClick={handleDelete} disabled={deleteTodo.isPending}>
        {deleteTodo.isPending ? "Deleting..." : "Delete Todo"}
      </button>

      {deleteTodo.isSuccess && <p style={{marginTop: "1rem", color: "green"}}>Todo Deleted Successfully!!</p>}
      {deleteTodo.isError && <p style={{marginTop:"1rem", color:"red"}}>{deleteTodo.error.message}</p>}
    </div>
  );
}

export default App;
