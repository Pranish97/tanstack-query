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
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 *30,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true
  });
};

export const createPostQueryOptions = () => {
  return queryOptions({
    queryKey: ["posts"],
    queryFn: getPosts,
    enabled: true,
    // staleTime: 1000 * 60 * 5,
    // refetchInterval: 10000,
    // refetchOnWindowFocus: true
  });
};
