import axios from "axios";
import "./App.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Todo } from "./types";

const getToDos = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  return response.data;
};

const deleteTodo = async (id: number) => {
  return await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
};

function App() {
  const queryClient = useQueryClient();

  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: getToDos,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData(["todos"]);

      queryClient.setQueryData(["todos"], (oldTodos: []) =>
        oldTodos.filter((todo: Todo) => todo.id !== id)
      );
      return { previousTodos };
    },

    onError: (err, id, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      <h2>Todos</h2>
      <ul>
        {todos?.map((todo: Todo) => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => deleteMutation.mutate(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      {deleteMutation.isSuccess && (
        <div style={{ marginTop: "1rem", color: "green" }}>
          Todo Deleted Successfully!
        </div>
      )}
      {deleteMutation.isError && (
        <div style={{ marginTop: "1rem", color: "red" }}>
          {deleteMutation.error.message}
        </div>
      )}
    </div>
  );
}

export default App;
