import { queryOptions } from "@tanstack/react-query";
import axios from "axios";

const getToDos = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos"
  );
  return response.data;
};

const getPosts = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return response.data;
};

export const createTodoQueryOptions = () => {
  return queryOptions({
    queryKey: ["todos"],
    queryFn: getToDos,
  });
};

export const createPostQueryOptions = () => {
  return queryOptions({
    queryKey: ["posts"],
    queryFn: getPosts,
    enabled: true
  });
};
