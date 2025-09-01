import { useQuery } from "@tanstack/react-query";
import "./App.css";
import { createPostQueryOptions, createTodoQueryOptions } from "./queryOptions/createQueryOptions";
import type { POST, Todo } from "./types";





function App() {
  const { data: todos, error:todoErrors, isSuccess: todoSuccess } = useQuery(createTodoQueryOptions());

  const { data: posts, error: postError, isSuccess:postSuccess } = useQuery(createPostQueryOptions());

  return (
    <>
      {todoSuccess && <h1>Data Fetched Successfully!</h1>}
      <ul>
        {todoSuccess &&
          todos.map((todo: Todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        {todoErrors && <p>{todoErrors.message}</p>}
      </ul>

      {postSuccess && <h1>Post Fetched Successfully!</h1>}
      <ul>
        {postSuccess &&
          posts.map((post: POST) => (
            <li key={post.id}>{post.title}</li>
          ))}
        {postError && <p>{postError.message}</p>}
      </ul>
    </>
  );
}

export default App;
